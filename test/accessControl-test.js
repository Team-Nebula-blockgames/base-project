const { ethers } = require("hardhat");
const { use, expect } = require("chai");

const { ContractFactory } = require("ethers");

let accounts;

describe("AccessControl", function () {

    beforeEach(async() => {
        accounts = await ethers.getSigners();
        contractFactory = await ethers.getContractFactory("AccessControl");
        AccessControl = await ethers.getContractFactory("AccessControl");
        accessControl = await AccessControl.deploy();
        await accessControl.deployed();
        ADMIN = "0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42";
        owner = accounts[0].address;
    });

    it("Should deploy AccessControl contract", async function() {
        expect(await accessControl.deployed(), "AccessControl contract not deployed");
    });

    it("Admin should be able to transfer ownership", async function() {
        let _role = ADMIN;
        let _account = accounts[3].address;
        // expect(amount).to.be.greaterThan(0, "You cannot mint zero tokens!");
        console.log("Granting...");
        await accessControl.grantRole(_role, _account);
        // expect((await nestCoin.balanceOf(owner)).toNumber()).to.be.greaterThanOrEqual(amount, "Tokens were not successfully minted!");
        
    });

    it("Admin should be able to revoke ownership", async function() {
        let _role = ADMIN;
        let _account = accounts[3].address;
        // expect(amount).to.be.greaterThan(0, "You cannot mint zero tokens!");
        console.log("Revoking...");
        await accessControl.grantRole(_role, _account);
        // expect((await nestCoin.balanceOf(owner)).toNumber()).to.be.greaterThanOrEqual(amount, "Tokens were not successfully minted!");
        
    });

});
