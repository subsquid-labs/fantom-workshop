import { Indexed } from '@ethersproject/abi';
import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './rave.abi'

export const abi = new ethers.utils.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, approved: string, tokenId: ethers.BigNumber] & {owner: string, approved: string, tokenId: ethers.BigNumber})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    ApprovalForAll: new LogEvent<([owner: string, operator: string, approved: boolean] & {owner: string, operator: string, approved: boolean})>(
        abi, '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31'
    ),
    Migration: new LogEvent<[]>(
        abi, '0x1367a078b4435fe3fa4a46354a57663be6387576edee722ef204dc484fc8c3bd'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    Registered: new LogEvent<([name: Indexed, owner: string] & {name: Indexed, owner: string})>(
        abi, '0x50f74ca45caac8020b8d891bd13ea5a2d79564986ee6a839f0d914896388322d'
    ),
    SetAddresses: new LogEvent<([name: string, addresses: string] & {name: string, addresses: string})>(
        abi, '0x0952158521adedb55943f07d324b6cc91ea396ccef8119db7d08b5c966a7672c'
    ),
    SetAvatar: new LogEvent<([name: string, avatar: string] & {name: string, avatar: string})>(
        abi, '0x71584e829984a0c3375cf17140dd04adcaf0364d5b7eec080921e16519e4f219'
    ),
    SetURI: new LogEvent<([uri: string] & {uri: string})>(
        abi, '0x1150f930a11acd3b9029b158a70b48bcb5fdffa8f9c5ea364d87b3bc2a6e60d6'
    ),
    Transfer: new LogEvent<([from: string, to: string, tokenId: ethers.BigNumber] & {from: string, to: string, tokenId: ethers.BigNumber})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
}

export const functions = {
    approve: new Func<[to: string, tokenId: ethers.BigNumber], {to: string, tokenId: ethers.BigNumber}, []>(
        abi, '0x095ea7b3'
    ),
    balanceOf: new Func<[owner: string], {owner: string}, ethers.BigNumber>(
        abi, '0x70a08231'
    ),
    bulkRegister: new Func<[names: Array<string>], {names: Array<string>}, []>(
        abi, '0x791a26b4'
    ),
    bulkRegisterAndSend: new Func<[names: Array<string>, addresses: Array<string>], {names: Array<string>, addresses: Array<string>}, []>(
        abi, '0xdb9042d1'
    ),
    changeName: new Func<[name: string], {name: string}, string>(
        abi, '0x5353a2d8'
    ),
    extension: new Func<[], {}, string>(
        abi, '0x2d5537b0'
    ),
    f: new Func<[p: ethers.BigNumber], {p: ethers.BigNumber}, []>(
        abi, '0xb3de648b'
    ),
    getAddresses: new Func<[name: string], {name: string}, string>(
        abi, '0x39b64c30'
    ),
    getApproved: new Func<[tokenId: ethers.BigNumber], {tokenId: ethers.BigNumber}, string>(
        abi, '0x081812fc'
    ),
    getAvatar: new Func<[name: string], {name: string}, string>(
        abi, '0x7d840ed5'
    ),
    getName: new Func<[owner: string, index: ethers.BigNumber], {owner: string, index: ethers.BigNumber}, string>(
        abi, '0xe1090cff'
    ),
    getNames: new Func<[owner: string], {owner: string}, Array<string>>(
        abi, '0xa833c64b'
    ),
    getOwner: new Func<[name: string], {name: string}, string>(
        abi, '0x4aaf4a12'
    ),
    isApprovedForAll: new Func<[owner: string, operator: string], {owner: string, operator: string}, boolean>(
        abi, '0xe985e9c5'
    ),
    migrate: new Func<[ravev1: string, startAt: ethers.BigNumber, endAt: ethers.BigNumber], {ravev1: string, startAt: ethers.BigNumber, endAt: ethers.BigNumber}, []>(
        abi, '0xfc22d0e5'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    owned: new Func<[name: string], {name: string}, boolean>(
        abi, '0x889825b5'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    ownerOf: new Func<[tokenId: ethers.BigNumber], {tokenId: ethers.BigNumber}, string>(
        abi, '0x6352211e'
    ),
    price: new Func<[], {}, ethers.BigNumber>(
        abi, '0xa035b1fe'
    ),
    registerName: new Func<[_name: string], {_name: string}, []>(
        abi, '0x0830602b'
    ),
    registerNameAndSend: new Func<[_name: string, sendTo: string], {_name: string, sendTo: string}, []>(
        abi, '0x8558dbe8'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    'safeTransferFrom(address,address,uint256)': new Func<[from: string, to: string, tokenId: ethers.BigNumber], {from: string, to: string, tokenId: ethers.BigNumber}, []>(
        abi, '0x42842e0e'
    ),
    'safeTransferFrom(address,address,string)': new Func<[from: string, to: string, name: string], {from: string, to: string, name: string}, []>(
        abi, '0x52adffd7'
    ),
    'safeTransferFrom(address,address,uint256,bytes)': new Func<[from: string, to: string, tokenId: ethers.BigNumber, data: string], {from: string, to: string, tokenId: ethers.BigNumber, data: string}, []>(
        abi, '0xb88d4fde'
    ),
    setAddresses: new Func<[_name: string, addresses: string], {_name: string, addresses: string}, []>(
        abi, '0x45772035'
    ),
    setApprovalForAll: new Func<[operator: string, approved: boolean], {operator: string, approved: boolean}, []>(
        abi, '0xa22cb465'
    ),
    setAvatar: new Func<[_name: string, avatar: string], {_name: string, avatar: string}, []>(
        abi, '0xd3189e06'
    ),
    setURI: new Func<[newUri: string], {newUri: string}, []>(
        abi, '0x6c1a1779'
    ),
    supportsInterface: new Func<[interfaceId: string], {interfaceId: string}, boolean>(
        abi, '0x01ffc9a7'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    tokenByIndex: new Func<[index: ethers.BigNumber], {index: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0x4f6ccce7'
    ),
    tokenOfOwnerByIndex: new Func<[owner: string, index: ethers.BigNumber], {owner: string, index: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0x2f745c59'
    ),
    tokenURI: new Func<[tokenId: ethers.BigNumber], {tokenId: ethers.BigNumber}, string>(
        abi, '0xc87b56dd'
    ),
    totalSupply: new Func<[], {}, ethers.BigNumber>(
        abi, '0x18160ddd'
    ),
    'transferFrom(address,address,uint256)': new Func<[from: string, to: string, tokenId: ethers.BigNumber], {from: string, to: string, tokenId: ethers.BigNumber}, []>(
        abi, '0x23b872dd'
    ),
    'transferFrom(address,address,string)': new Func<[from: string, to: string, name: string], {from: string, to: string, name: string}, []>(
        abi, '0x3ebfc934'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    treasury: new Func<[], {}, string>(
        abi, '0x61d027b3'
    ),
    uri: new Func<[], {}, string>(
        abi, '0xeac989f8'
    ),
}

export class Contract extends ContractBase {

    balanceOf(owner: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.balanceOf, [owner])
    }

    changeName(name: string): Promise<string> {
        return this.eth_call(functions.changeName, [name])
    }

    extension(): Promise<string> {
        return this.eth_call(functions.extension, [])
    }

    getAddresses(name: string): Promise<string> {
        return this.eth_call(functions.getAddresses, [name])
    }

    getApproved(tokenId: ethers.BigNumber): Promise<string> {
        return this.eth_call(functions.getApproved, [tokenId])
    }

    getAvatar(name: string): Promise<string> {
        return this.eth_call(functions.getAvatar, [name])
    }

    getName(owner: string, index: ethers.BigNumber): Promise<string> {
        return this.eth_call(functions.getName, [owner, index])
    }

    getNames(owner: string): Promise<Array<string>> {
        return this.eth_call(functions.getNames, [owner])
    }

    getOwner(name: string): Promise<string> {
        return this.eth_call(functions.getOwner, [name])
    }

    isApprovedForAll(owner: string, operator: string): Promise<boolean> {
        return this.eth_call(functions.isApprovedForAll, [owner, operator])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    owned(name: string): Promise<boolean> {
        return this.eth_call(functions.owned, [name])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    ownerOf(tokenId: ethers.BigNumber): Promise<string> {
        return this.eth_call(functions.ownerOf, [tokenId])
    }

    price(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.price, [])
    }

    supportsInterface(interfaceId: string): Promise<boolean> {
        return this.eth_call(functions.supportsInterface, [interfaceId])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    tokenByIndex(index: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.tokenByIndex, [index])
    }

    tokenOfOwnerByIndex(owner: string, index: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.tokenOfOwnerByIndex, [owner, index])
    }

    tokenURI(tokenId: ethers.BigNumber): Promise<string> {
        return this.eth_call(functions.tokenURI, [tokenId])
    }

    totalSupply(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.totalSupply, [])
    }

    treasury(): Promise<string> {
        return this.eth_call(functions.treasury, [])
    }

    uri(): Promise<string> {
        return this.eth_call(functions.uri, [])
    }
}
