const { ethers } = require("hardhat");
const { use, expect } = require("chai");

const { ContractFactory } = require("ethers");

let accounts;

describe("AccessControl", function () {

    beforeEach(async() => {
        accounts = await ethers.getSigners();

        accessControlFactory = await ethers.getContractFactory("AccessControl");
        accessControl = await accessControlFactory.deploy();
        await accessControl.deployed();

        let nestCoinFactory = await ethers.getContractFactory("Nestcoin");
        nestCoinContract = await nestCoinFactory.deploy();
        await nestCoinContract.deployed();
    
        let multiTransferTokenEqualFactory = await ethers.getContractFactory(
          "MultiTransferTokenEqual"
        );
        multiTransferTokenEqualContract =
          await multiTransferTokenEqualFactory.deploy();
        await multiTransferTokenEqualContract.deployed();


        newAdmin = accounts[1];
        ADMIN_HASH =
          "0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42"; //hash for role admin
        await nestCoinContract.grantRole(ADMIN_HASH, newAdmin.address);   

        owner = accounts[0].address;
    });

    it("Should deploy AccessControl contract", async function() {
        expect(await accessControl.deployed(), "AccessControl contract not deployed");
    });

    it("Admin should be able to transfer ownership", async function() {
        let _role = ADMIN_HASH;
        let _account = accounts[3].address;
        await accessControl.grantRole(_role, _account);
        
    });

    it("Admin should be able to revoke ownership", async function() {
        let _role = ADMIN_HASH;
        let _account = accounts[3].address;
        await accessControl.grantRole(_role, _account);
    });

    
    it("Should allow new admins mint tokens.", async () => {
        let amount = 10;
        let mintedAmount = (10 * 10 ** 18).toString();
        
        await nestCoinContract.connect(newAdmin).mint(amount);
        expect(await nestCoinContract.balanceOf(newAdmin.address)).to.equals(mintedAmount, "Couldn't mint tokens!");
    });

    it("Should allow new admins perform batch token transfers.", async () => {
    
        let amount = 10;
        let mintedTokens = 1000;
        let _addresses = [
          accounts[2].address,
          accounts[3].address,
          accounts[4].address,
        ];
    
        await nestCoinContract.connect(newAdmin).mint(mintedTokens);
        await nestCoinContract
          .connect(newAdmin)
          .approve(
            multiTransferTokenEqualContract.address,
            ethers.utils.parseEther(String(mintedTokens))
          );
        let newAdminBalance = Number(
          await nestCoinContract.balanceOf(newAdmin.address)
        );
    
        await multiTransferTokenEqualContract
          .connect(newAdmin)
          .multiSend(nestCoinContract.address, _addresses, amount);
    
        expect(Number(await nestCoinContract.balanceOf(newAdmin.address))).equals(
          newAdminBalance -
            Number(ethers.utils.parseEther(String(amount)) * _addresses.length)
        );
    });

    it("New admin should be able to transfer ownership", async function() {
      let _account = accounts[3].address;
      await accessControl.grantRole(ADMIN_HASH, _account);
      
  });

  it("New admin should be able to revoke ownership", async function() {
      let _account = accounts[3].address;
      await accessControl.grantRole(ADMIN_HASH, _account);
  });

});
