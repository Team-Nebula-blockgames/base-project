//Script to connect to deployed contract and send in transactions
const { ethers } = require("hardhat");
const main = async () => {
  const [connector] = await ethers.getSigners();
  const accountBalance = await connector.getBalance();

  console.log(
    connector.address,
    " is connecting to MultiTransferTokenEqual Contract..."
  );
  console.log(
    connector.address,
    " Account balance: ",
    accountBalance.toString()
  );

  const contractAddress = "0xab513913C7Bf7C050E75BB62143a114f3AAF3f20";
  const myContract = await ethers.getContractAt(
    "MultiTransferTokenEqual",
    contractAddress
  );

  let myBalance = await myContract.ticketCount();
  console.log(myBalance);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

runMain();
