const { ethers } = require("hardhat");
const { use, expect } = require("chai");

const { ContractFactory } = require("ethers");

let accounts;

describe("Token", function () {

    beforeEach(async() => {
        accounts = await ethers.getSigners();
        contractFactory = await ethers.getContractFactory("Nestcoin");
        Nestcoin = await ethers.getContractFactory("Nestcoin");
        nestCoin = await Nestcoin.deploy();
        await nestCoin.deployed();
        owner = accounts[0].address;
    });

    it("Should deploy token contract", async function() {
        expect(await nestCoin.deployed(), "Token contract not deployed");
    });

    it("Admin should be able to mint tokens", async function() {
        let amount = 10;
        console.log("Minting...");
        await nestCoin.mint(amount);
        expect(await nestCoin.balanceOf(owner)).to.equals(amount, "Tokens were not successfully minted!");
    });

});
