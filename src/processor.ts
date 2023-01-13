import { TypeormDatabase } from "@subsquid/typeorm-store";
import {EvmBatchProcessor} from '@subsquid/evm-processor'

const processor = new EvmBatchProcessor()
  .setDataSource({
    // chain: process.env.RPC_ENDPOINT,
    archive: 'https://fantom.archive.subsquid.io',
  });


processor.run(new TypeormDatabase(), async (ctx) => {
  for (let c of ctx.blocks) {
    for (let i of c.items) {
      // apply arbitrary data transformation logic here
      // use ctx.store to persist the data
      ctx.log.info(i, "Next item:")
    }
  }
});

