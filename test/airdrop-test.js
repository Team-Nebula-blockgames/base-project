const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");
const { ContractFactory } = require("ethers");

use(solidity);

describe("MultiTransferTokenEqual", function () {


beforeEach(async() => {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    contractFactory = await ethers.getContractFactory("MultiTransferTokenEqual");
    Nestcoin = await ethers.getContractFactory("Nestcoin");
    MultiTransferTokenEqual = await ethers.getContractFactory("MultiTransferTokenEqual");
    nestCoin = await Nestcoin.deploy();
    multiTransferTokenEqual = await MultiTransferTokenEqual.deploy();
    await nestCoin.deployed()
    await multiTransferTokenEqual.deployed()
});

it("Should deploy token contract", async function() {
    expect(await nestCoin.deployed(), "Token contract not deployed");
});

it("Should deploy MultiTransferTokenEqual", async function () { 
    expect(await multiTransferTokenEqual.deployed(), "MultiTransferTokenEqual not deployed");
});

it("Should perform a batch transfer", async function () {
    let amount = 0;
    let _token = nestCoin.address;
    let contractTokenBalance = (await nestCoin.balanceOf(multiTransferTokenEqual.address)).toNumber();

    
    await multiTransferTokenEqual.multiSend(_token, accounts, amount);
    console.log("Transferring tokens to ", accounts.length, " account(s)");
    expect ((await nestCoin.balanceOf(owner.address)).toNumber()).to.be.greaterThanOrEqual(amount, "Token balance is low, mint more tokens!");

    contractTokenBalance = (await nestCoin.balanceOf(multiTransferTokenEqual.address)).toNumber();
});
});