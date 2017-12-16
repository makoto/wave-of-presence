# Wave of Presence

"Web of Trust" style event check in system.

During meetups and parties, check in process tends to be the bottleneck as there are way more participants than organisers.

"Wave of Presence" is a blockchain based online check in system where you can delegate the check in capability into participants as volunteers so that you can make check in process more efficient.

NOTE: "Web Of Trust" is used in public key management on PGP

## Motivation

I have an event registration Dapp called [BlockParty](http://www.noblockno.party) where it takes deposit and distribute it among participants to incentivize event turn ups.

The Dpp has been used to manage real event (eg: DevCon social party and local meetups such as Ethereum London) on mainnet, though check in process is still manual and building a custom blockchain based Dapp faces the following problems.

[Image of checkin paper]

- Manually looking up names (either by paper or by spreadsheet) is still error prone. As deposits are at stake, it needs to minimise the error rates. It requires an easily scannable QR code like solution.
- The majority of Blockchain wallet (mostly metamask) identities are tied into each browser on a physical machine, hence we cannot reuse single laptop among multiple volunteers who help check in process.
- Mobile wallet (such as LETH, Toshi, ImToken, and Status.im) are available but it will take time to setup (especially mnemonic generation phase). The volunteers who help check in process at Ethereum London (mostly university students) have different skill level about blockchain and educating each volunteers in advance is difficult.
- Self check in through shared QR code (which is the way UPort team demonstrated during Ethereal and DevCon3) is a weak way as people can easily share the QR code through social media.

## What does Wave Of Presence provides?

Wave Of Presence is a portable

## What is the checkin process ?

- [YouTube demo](https://youtu.be/P3ayfYF7dVU)

## FAQ

### What does Uport provide to solve these problems?

- Built in QR generator / scanner to easily scan participants identity.
- Portable identity which minimises setup time to interact with Dapps.
- Attestation can be used to issue a proof of  presence of the event.
- An ability to send transaction to blockchain so that it can add additional permission management through smart contract.

### What does Uport not provide?

P2P verification. I was initially considering using Uport attestation (in stead of smart contract) to manage permission control. However the current Uport APIs are mostly focused on server side attestation and verification so it turned out that it was not suitable for tis use case.
