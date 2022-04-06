const { ethers } = require("hardhat");
const { use, expect } = require("chai");

const { ContractFactory } = require("ethers");

let accounts;

describe("MultiTransferTokenEqual", function () {


    beforeEach(async() => {
        accounts = await ethers.getSigners();
        contractFactory = await ethers.getContractFactory("MultiTransferTokenEqual");
        Nestcoin = await ethers.getContractFactory("Nestcoin");
        MultiTransferTokenEqual = await ethers.getContractFactory("MultiTransferTokenEqual");
        nestCoin = await Nestcoin.deploy();
        multiTransferTokenEqual = await MultiTransferTokenEqual.deploy();
        await nestCoin.deployed();
        await multiTransferTokenEqual.deployed();
        owner = accounts[0].address;
    });

    it("Should deploy token contract", async function() {
        expect(await nestCoin.deployed(), "Token contract not deployed");
    });

    it("Should deploy MultiTransferTokenEqual", async function () { 
        expect(await multiTransferTokenEqual.deployed(), "MultiTransferTokenEqual not deployed");
    });

    it("Should perform a batch transfer", async function () {
        let amount = 0;
        let _addresses = [accounts[2].address, accounts[3].address, accounts[4].address];
        let _token = nestCoin.address;
        let contractTokenBalance = (await nestCoin.balanceOf(owner)).toNumber();
        
        await multiTransferTokenEqual.multiSend(_token, _addresses, amount);
        console.log("Transferring tokens to ", _addresses.length, " account(s)");
        expect (contractTokenBalance).to.be.greaterThanOrEqual(amount, "Token balance is low, mint more tokens!");
    });
});