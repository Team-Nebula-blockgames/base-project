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
        MultiTransferTokenEqual = await ethers.getContractFactory("MultiTransferTokenEqual");
        multiTransferTokenEqual = await MultiTransferTokenEqual.deploy();
        await nestCoin.deployed();
        owner = accounts[0].address;
    });

    it("Should deploy token contract", async function() {
        expect(await nestCoin.deployed(), "Token contract not deployed");
    });

    it("Admin should be able to mint tokens", async function() {
        let amount = 10;
        let mintedAmount = (10 * 10 ** 18).toString();
        console.log("Minting...");
        await nestCoin.mint(amount);
        expect(await nestCoin.balanceOf(owner)).to.equals(mintedAmount, "Tokens were not successfully minted!");
        console.log("Minted ", amount," to owner successfully!");
    });

    it("Admin should be able to approve transaction for Batch Transfer", async function() {
        let _addresses = [
            accounts[2].address,
            accounts[3].address,
            accounts[4].address,
        ];
        let _list = _addresses.length;
        expect(await nestCoin.approveMulti(1000, multiTransferTokenEqual.address, _list));
    });

});
