---
marp: true
theme: uncover
_class: lead
paginate: false
backgroundColor: #fff
backgroundImage: url(./2.png)
style: |
  .columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  .columns-left {
    background: yellow;
  }
  .columns-right {
    background: beige;
  }
  .title {
    color: #FFB800
  }
---
<!-- _backgroundImage: url(./fantom-slide-01.png) -->

---

<!-- _backgroundImage: url(./fantom-slide-02.png) -->

---
<!-- _backgroundImage: url(./fantom-slide-03.png) -->

---
<!-- _backgroundImage: url(./fantom-slide-04.png) -->

---
<!-- _backgroundImage: url(./fantom-slide-05.png) -->

---
<!-- _backgroundImage: url(./fantom-slide-06.png) -->

---
<!-- _backgroundImage: url(./fantom-slide-07.png) -->

---
<!-- _backgroundImage: url(./fantom-slide-08.png) -->

---
<!-- _backgroundImage: url(./fantom-slide-09.png) -->

---
<!-- _backgroundImage: url(./fantom-slide-10.png) -->

---
<!-- _backgroundImage: url(./fantom-slide-11.png) -->

---
<!-- _color: #105EFB -->
<span class="title">

### From schema...
</span>

```graphql
type Owner @entity {
  id: ID!
  ownedTokens: [Token!]! @derivedFrom(field: "owner")
  balance: BigInt
}
```

---
<!-- _color: #105EFB -->

<span class="title">

####
#### ...To Models
</span>

```typescript
@Entity_()
export class Owner {
  constructor(props?: Partial<Owner>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @OneToMany_(() => Token, e => e.owner)
  ownedTokens!: Token[]

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  balance!: bigint | undefined | null
}

```

---
<!-- _color: #105EFB -->

<span class="title">

### From ABI...
</span>

```json
[
  // ...
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // ...
]
```

---
<!-- _color: #105EFB -->

<span class="title">

### …to TypeScript
</span>

```typescript
export const functions = {
    // ...
    approve: new Func<[to: string, tokenId: ethers.BigNumber], {to: string, tokenId: ethers.BigNumber}, []>(
        abi, '0x095ea7b3'
    ),
    // ...
}

const { _name } = functions.approve.decode(transaction.input);
```

---
<!-- _color: #105EFB -->

<span class="title">

### Aquarium hosting service
</span>

```bash
npm i -g @subsquid/cli@latest
sqd deploy .
```

Visit [app.subsquid.io](https://app.subsquid.io/)

---
<!-- _color: #105EFB -->

<span class="title">

### Resources
</span>

Docs [docs.subsquid.io](https://docs.subsquid.io)
GitHub [github.com/subsquid/](https://github.com/subsquid/)
YouTube [youtube.com/c/subsquid](https://www.youtube.com/channel/@subsquid)
Discord [discord.gg/subsquid](https://discord.gg/subsquid)
Telegram [t.me/HydraDevs](https://t.me/HydraDevs)
Medium [medium.com/subsquid](https://medium.com/subsquid)


