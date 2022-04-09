const chai = require("chai");
const { expect, assert } = chai;
chai.use(require("chai-as-promised"));
const { ethers } = require("hardhat");

describe("MultiTransferTokenEqual Contract 💢", function () {
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    admin = accounts[0];

    let nestcoinFactory = await ethers.getContractFactory("Nestcoin");
    nestCoinContract = await nestcoinFactory.deploy();
    await nestCoinContract.deployed();

    let multiTransferTokenEqualFactory = await ethers.getContractFactory(
      "MultiTransferTokenEqual"
    );
    multiTransferTokenEqualContract =
      await multiTransferTokenEqualFactory.deploy();
    await multiTransferTokenEqualContract.deployed();
  });

  it("Should deploy contract and set owner👍", async function () {
    let nestCoinOwner = await nestCoinContract.owner();
    let multiTransferTokenEqualOwner =
      await multiTransferTokenEqualContract.owner();

    expect(nestCoinOwner, "nestcoin contract not deployed").equals(
      admin.address
    );
    expect(
      multiTransferTokenEqualOwner,
      "multiTransferTokenEqual contract not deployed"
    ).equals(admin.address);
  });

  it("Should allow owner perform batch token transfers👍", async function () {
    let noOfTokenForBatchTransfer = 10;
    let mintedTokens = 100;
    let _addresses = [
      accounts[2].address,
      accounts[3].address,
      accounts[4].address,
    ];

    await nestCoinContract.mint(mintedTokens);
    await nestCoinContract.approve(
      multiTransferTokenEqualContract.address,
      ethers.utils.parseEther(String(mintedTokens))
    );
    let adminBalance = Number(await nestCoinContract.balanceOf(admin.address));

    await multiTransferTokenEqualContract.multiSend(
      nestCoinContract.address,
      _addresses,
      noOfTokenForBatchTransfer
    );

    expect(
      Number(await nestCoinContract.balanceOf(admin.address))
    ).lessThanOrEqual(
      adminBalance -
        Number(
          ethers.utils.parseEther(String(noOfTokenForBatchTransfer)) *
            _addresses.length
        )
    );

    expect(Number(await nestCoinContract.balanceOf(_addresses[0]))).equals(
      Number(ethers.utils.parseEther(String(noOfTokenForBatchTransfer)))
    );

    expect(Number(await nestCoinContract.balanceOf(_addresses[1]))).equals(
      Number(ethers.utils.parseEther(String(noOfTokenForBatchTransfer)))
    );

    expect(Number(await nestCoinContract.balanceOf(_addresses[2]))).equals(
      Number(ethers.utils.parseEther(String(noOfTokenForBatchTransfer)))
    );
  });

  it("Should allow only admins perform batch token transfers.👍", async () => {
    let newAdmin = accounts[1];
    const ADMIN_HASH =
      "0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42"; //hash for role admin
    await nestCoinContract.grantRole(ADMIN_HASH, newAdmin.address);

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

    const tryCallMultiSend = async () => {
      await multiTransferTokenEqualContract
        .connect(accounts[2])
        .multiSend(nestCoinContract.address, _addresses, amount);
    };
    await expect(tryCallMultiSend()).to.be.rejectedWith(
      "VM Exception while processing transaction: reverted with reason string 'You are not an admin'"
    );
    expect(Number(await nestCoinContract.balanceOf(newAdmin.address))).equals(
      newAdminBalance -
        Number(ethers.utils.parseEther(String(amount)) * _addresses.length)
    );
  });
});
