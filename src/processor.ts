import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import {BlockHandlerContext, EvmBatchProcessor, LogHandlerContext} from '@subsquid/evm-processor';
import { events, Contract as ContractAPI } from "./abi/rave";
import { Contract, Owner, Token, Transfer } from "./model";
import { BigNumber } from "ethers";
import { In } from "typeorm";
import { Indexed } from "@ethersproject/abi";

const raveAddress = "0x14Ffd1Fa75491595c6FD22De8218738525892101".toLowerCase();

const processor = new EvmBatchProcessor()
  .setDataSource({
    chain: process.env.RPC_ENDPOINT,
    archive: 'https://fantom.archive.subsquid.io',
  })
  .addLog(
    raveAddress, {
      filter: [[events.Registered.topic, events.Transfer.topic]],
      data : {
        evmLog: {
          topics: true,
          data: true
        },
        transaction: {
          hash: true,
        }
      }
    }
  );


processor.run(new TypeormDatabase(), async (ctx) => {
  const raveDataArray: RaveData[] = [];
  let tokenCounter = await ctx.store.count(Token);

  for (let b of ctx.blocks) {
    for (let i of b.items) {
      if (i.address === raveAddress && i.kind === "evmLog" ) {
        if (i.evmLog.topics[0] == events.Registered.topic) {
          raveDataArray.push(handleRegistered({
            ...ctx,
            block: b.header,
            ...i
          }, tokenCounter))
          // increment token counter
          tokenCounter += 1;
        }
        if (i.evmLog.topics[0] == events.Transfer.topic) {
          raveDataArray.push(handleTransfer({
            ...ctx,
            block: b.header,
            ...i
          }))
        }
      }
    }
  }

  await saveRaveData(
    {
      ...ctx,
      block: ctx.blocks[ctx.blocks.length - 1].header,
    },
    raveDataArray
  );
});

type RaveData = {
  id: string;
  from?: string;
  to: string;
  tokenId: number;
  name?: string;
  timestamp: bigint;
  block: number;
  transactionHash: string;
};

function handleRegistered(
  ctx: LogHandlerContext<
    Store,
    {
      evmLog: {
        topics: true,
        data: true
      },
      transaction: {
        hash: true,
      }
    }
  >,
  tokenCounter: number
): RaveData {

  const { evmLog, block, transaction } = ctx;

  let {owner, name} = events.Registered.decode(evmLog);

  const raveData: RaveData = {
    id: `${transaction.hash}-${evmLog.address}-${name}-${
      evmLog.index
    }`,
    to: owner,
    tokenId: tokenCounter,
    name: name.hash,
    timestamp: BigInt(block.timestamp),
    block: block.height,
    transactionHash: transaction.hash,
  };

  return raveData;
}

function handleTransfer(
  ctx: LogHandlerContext<
    Store,
    {
      evmLog: {
        topics: true,
        data: true
      },
      transaction: {
        hash: true,
      }
    }
  >): RaveData {

    const { evmLog, block, transaction } = ctx;
  
    const { from, to, tokenId } = events.Transfer.decode(evmLog);
    
    return {
      id: `${transaction.hash}-${evmLog.address}-${tokenId}-${
        evmLog.index
      }`,
      from,
      to,
      tokenId: tokenId.toNumber(),
      timestamp: BigInt(block.timestamp),
      block: block.height,
      transactionHash: transaction.hash,
    };
}

let contractEntity: Contract | undefined;

export async function getOrCreateContractEntity(
  ctx: BlockHandlerContext<Store>
): Promise<Contract> {
  if (contractEntity == null) {
    contractEntity = await ctx.store.get(Contract, raveAddress);
    if (contractEntity == null) {
      const contractAPI = new ContractAPI(ctx, raveAddress);
      let name = "", symbol = "", contractURI = "", totalSupply = BigNumber.from(0);
      try {
        name = await contractAPI.name();
        symbol = await contractAPI.symbol();
        contractURI = await contractAPI.uri();
        totalSupply = await contractAPI.totalSupply();
      } catch (error) {
        ctx.log.warn(`[API] Error while fetching Contract metadata for address ${raveAddress}`);
        if (error instanceof Error) {
          ctx.log.warn(`${error.message}`);
        }
      }
      contractEntity = new Contract({
        id: raveAddress,
        name,
        contractURI,
        symbol,
        totalSupply: totalSupply.toBigInt(),
      });
      await ctx.store.insert(contractEntity);
    }
  }
  return contractEntity;
}

async function saveRaveData(
  ctx: BlockHandlerContext<Store>,
  raveDataArr: RaveData[]
) {
  const tokensIds: Set<string> = new Set();
  const ownersIds: Set<string> = new Set();

  for (const ensData of raveDataArr) {
    tokensIds.add(ensData.tokenId.toString());
    if (ensData.from) ownersIds.add(ensData.from.toLowerCase());
    if (ensData.to) ownersIds.add(ensData.to.toLowerCase());
  }

  const transfers: Set<Transfer> = new Set();

  const tokens: Map<string, Token> = new Map(
    (await ctx.store.findBy(Token, { id: In([...tokensIds]) })).map((token) => [
      token.id,
      token,
    ])
  );

  const owners: Map<string, Owner> = new Map(
    (await ctx.store.findBy(Owner, { id: In([...ownersIds]) })).map((owner) => [
      owner.id,
      owner,
    ])
  );

  for (const ensData of raveDataArr) {
    const {
      id,
      tokenId,
      name,
      from,
      to,
      block,
      transactionHash,
      timestamp,
    } = ensData;

    let fromOwner = owners.get(from || "");
    if (from && fromOwner == null) {
      fromOwner = new Owner({ id: from });
      owners.set(fromOwner.id, fromOwner);
    }

    let toOwner = owners.get(to);
    if (toOwner == null) {
      toOwner = new Owner({ id: to });
      owners.set(toOwner.id, toOwner);
    }

    const tokenIdString = tokenId.toString();
    let token = tokens.get(tokenIdString);
    if (token == null) {
      token = new Token({
        id: tokenIdString,
        uri: "", // will be filled-in by Multicall
        contract: await getOrCreateContractEntity(ctx),
      });
      tokens.set(token.id, token);
    }
    if (name) token.name = name;
    token.owner = toOwner;

    if (toOwner && fromOwner) {
      const transfer = new Transfer({
        id,
        block,
        timestamp,
        transactionHash,
        from: fromOwner,
        to: toOwner,
        token,
      });

      transfers.add(transfer);
    }
  }

  await ctx.store.save([...owners.values()]);
  await ctx.store.save([...tokens.values()]);
  await ctx.store.save([...transfers]);
}

