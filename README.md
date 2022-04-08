# Nestcoin Filmhouse Project
This project require the team to come up with a system to create a token, distribute the token and also transfer the token in batch.

The features implemented in the project are:
* Create the ERC 20 Token (Nestcoin) with an unlimited supply and also Mint the token(Admin) *
* Transfer the tokens should only be done by an Admin*
* The Admin Access is just for one address, who can later add new admins
* There are event for distribution of tokens and adding new admins.

The project is divided into two, The contract and the client, 

# Client folder
This contain the frontend code for the MVP, purely developed in ReactJs (A framework for developing user interface)

# Contracts folder
This contain the smart contracts for creating token, distributing token and also the admin priviledge, it was developed with Hardhat (A framework for solidity development)

* Notable Functions in the Contract
- AccessControl.sol : Managing the admin access
- Nestcoin.sol : Creating the token
-MultiTransferTokenEqual.sol : distributing tokens to customers either in batch or in unit.





# Contribution Guide

Create a PR to the development branch, clone it to your local IDE,

- Create a .env file with the following variables

1. CONTRACT_NAMES = names of the contract that should be copied to the react app directory seperated by commas.
2. NODE_PROVIDER_URL = API link from node provider infura/alchemy etc.
3. PRIVATE_KEY = your wallet private key for deploying to rinkeby testnet.

- Run "npm install" (node version ^16 )

- Try running some of the following tasks:

```shell
npm run node (to start localhost testnet)
npm run deploy (to run deploy script on localhost)
npm run compile (to complie contracts and copy contract ABI to the client/contracts folder )
npm run deploy-rinkeby (to run deploy script on rinkeby testnet)
npm run test (to run contract test)
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.js
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```
