const { ethers } = require("hardhat");
const { use, expect } = require("chai");

const { ContractFactory } = require("ethers");

let accounts;

describe("MultiTransferTokenEqual", function () {

    beforeEach(async() => {
        accounts = await ethers.getSigners();
        contractFactory = await ethers.getContractFactory("MultiTransferTokenEqual");
        Nestcoin = await ethers.getContractFactory("Nestcoin");
        nestCoin = await Nestcoin.deploy();
        await nestCoin.deployed();
        owner = accounts[0].address;
    });

    it("Should deploy token contract", async function() {
        expect(await nestCoin.deployed(), "Token contract not deployed");
    });

    it("Owner should be able to mint tokens", async function() {
        let amount = 10;
        expect(amount).to.be.greaterThan(0, "You cannot mint zero tokens!");
        console.log("Minting...");
        await nestCoin.mint(amount);
        expect((await nestCoin.balanceOf(owner)).toNumber()).to.be.greaterThanOrEqual(amount, "Tokens were not successfully minted!");
        
    });

});
