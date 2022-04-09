const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Nestcoin");
  const multiTransferTokenEqualFactory = await ethers.getContractFactory(
    "MultiTransferTokenEqual"
  );
  const AccessControl = await ethers.getContractFactory("AccessControl");
  const token = await Token.deploy();
  const multiTransferTokenEqual = await multiTransferTokenEqualFactory.deploy();
  const accessControl = await AccessControl.deploy();

  console.log("Nestcoin contract address:", token.address);
  console.log(
    "MultiTransferTokenEqual contract address:",
    multiTransferTokenEqual.address
  );
  console.log("AccessControl contract Addresss:", accessControl.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
