const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");
const { accounts, contract } = require('@openzeppelin/test-environment');

use(solidity);

describe("NestCoinFilmHouse", function () {
  let multiTransferTokenEqual;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("MultiTransferTokenEqual", function () {
    it("Should deploy token contract", async function() 
    {
        // accounts[0] -> Contract Owner
        const Nestcoin = await ethers.getContractFactory("Nestcoin");
        nestCoin = await Nestcoin.deploy();
    });
   
    it("Should deploy MultiTransferTokenEqual", async function () {
      const Nestcoin = await ethers.getContractFactory("Nestcoin");
      const MultiTransferTokenEqual = await ethers.getContractFactory("MultiTransferTokenEqual");
      nestCoin = await Nestcoin.deploy();
      multiTransferTokenEqual = await MultiTransferTokenEqual.deploy();
    });

    it("Should perform a batch transfer", async function () {
        let _addresses = [];
        let amount = 1;
        let _token = "0x0f130701Dfe335278f1203e134ACe84d655f1b25";
        const Nestcoin = await ethers.getContractFactory("Nestcoin");
        const MultiTransferTokenEqual = await ethers.getContractFactory("MultiTransferTokenEqual");
        nestCoin = await Nestcoin.deploy();
        multiTransferTokenEqual = await MultiTransferTokenEqual.deploy();

        for(var i=0; i<_addresses.length; i++) {
          await multiTransferTokenEqual.multiSend(_token, _addresses[i], amount)
        }

        
        let contractTokenBalance = (await nestCoin.balanceOf(multiTransferTokenEqual.address)).toNumber();
        console.log("Transferring tokens to ", _addresses.length, " account(s)");
        expect ((await nestCoin.balanceOf(nestCoin.address)).toNumber()).to.be.greaterThanOrEqual(amount, "Token balance is low, mint more tokens!");

        contractTokenBalance = (await nestCoin.balanceOf(multiTransferTokenEqual.address)).toNumber();
    });
  });
});