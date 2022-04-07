const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("MultiTransferTokenEqual", function () {
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

  it("Should deploy  contract", async function () {
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

  it("Should perform a batch transfer", async function () {
    let amount = 10;
    let mintedTokens = 1000000;
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
    console.log("admin bal:", adminBalance);
    await multiTransferTokenEqualContract.multiSend(
      nestCoinContract.address,
      _addresses,
      amount
    );

    expect(Number(await nestCoinContract.balanceOf(admin.address))).equals(
      adminBalance -
        Number(ethers.utils.parseEther(String(amount)) * _addresses.length)
    );

    expect(Number(await nestCoinContract.balanceOf(_addresses[0]))).equals(
      Number(ethers.utils.parseEther(String(amount)))
    );

    expect(Number(await nestCoinContract.balanceOf(_addresses[1]))).equals(
      Number(ethers.utils.parseEther(String(amount)))
    );

    expect(Number(await nestCoinContract.balanceOf(_addresses[2]))).equals(
      Number(ethers.utils.parseEther(String(amount)))
    );
  });

  it("Should transfer to new admin", async () => {
    let newAdmin = accounts[1];
    await multiTransferTokenEqualContract.transferOwnership(newAdmin.address);
    await nestCoinContract.transferOwnership(newAdmin.address);

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
});
