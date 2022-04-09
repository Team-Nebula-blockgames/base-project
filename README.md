# Nestcoin Filmhouse Project

This project require the team to come up with a system to create a token, distribute the token and also transfer the token in batch.

The features implemented in the project are:

- Create the ERC 20 Token (Nestcoin) with an unlimited supply
- Restrict minting of tokens to only admins.
- Batch transfer the tokens should only be done by admins.
- Exchange Nestcoin tokens for movie tickets.
- Owner can pause and unpause token exchange for tickets and batch transfers of tokens.

# Deployed artifacts

- [Deployed UI](https://nebula-1.surge.sh/)
- [Nestcoin contract on etherscan](https://rinkeby.etherscan.io/address/0xb0D079a5d2cbc51cD0e7B054Ce55B4f37F535678)
- [MultiTransferTokenEqual on etherscan](https://rinkeby.etherscan.io/address/0xab513913C7Bf7C050E75BB62143a114f3AAF3f20)

The project is divided into two, The contract and the client,

# Client folder

This contain the frontend code for the MVP, purely developed in ReactJs (A framework for developing user interface)

# Contracts folder

This contain the smart contracts for creating token, distributing token and also the admin priviledge, it was developed with Hardhat (A framework for solidity development)

- Contracts present include.

* AccessControl.sol : Managing the admin access
* Nestcoin.sol : Creating the token
* MultiTransferTokenEqual.sol : Manages toke distribution

# Installation Guide

- Create a .env file with the following variables

1. CONTRACT_NAMES = names of the contract that should be copied to the react app directory seperated by commas.
2. NODE_PROVIDER_URL = API link from node provider infura/alchemy (For deployment to rinkeby testnet)
3. PRIVATE_KEY = your wallet private key (For deploying to rinkeby testnet).

- Run "npm install" (node version ^16 )
- Try running some of the following tasks:

```shell
npm run node (to start localhost testnet)
npm run deploy (to run deploy script on localhost)
npm run compile (to complie contracts and copy contract ABI to the client/contracts folder )
npm run deploy-rinkeby (to run deploy script on rinkeby testnet)
npm run test (to run contract test)
```
