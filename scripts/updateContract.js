const asyncfs = require("fs/promises");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

async function updateClientContract() {
  try {
    let contractName = process.env.CONTRACT_NAMES;
    await deleteExistingContractABI();
    contractName.split(",").forEach(async (element) => {
      console.log(`copying ${element}.sol to client/contracts 👍`);
      await asyncfs.copyFile(
        `artifacts/contracts/${element}.sol/${element}.json`,
        `client/src/contracts/${element}.json`
      );
    });
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

async function deleteExistingContractABI() {
  const directory = "client/src/contracts";
  await asyncfs.rm(directory, {
    recursive: true,
  });

  asyncfs.mkdir("client/src/contracts");
}

updateClientContract();
