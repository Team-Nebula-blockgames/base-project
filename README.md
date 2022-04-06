# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

N/B: When adding new contracts contract name and contract file name should be same.

# Client folder

The client folder is the folder for the react frontend app calling the contracts. The client/contracts directory contains the compiled contracts for the react front end application.

# Steps

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
