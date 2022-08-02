const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const BN = require("bn.js");
const { base58 } = require("ethers/lib/utils");

//const initialSupply = new BN(10000000);
//let initialSupply;
let erc20;
let owner;

addSnapshotBeforeRestoreAfterEach();

describe("ERC20", async function () {
  let erc20;
  let deployer;
  let erc20Factory;
  let owner;
  const initialSupply = 10000000 * 10 ** 18;
  const tt = ethers.utils.parseEther("10000000");
  let addr1;

  //for testing burn functionality
  const temp = 32423;

  this.beforeAll(async function () {
    [deployer, addr1] = await ethers.getSigners();
    erc20Factory = await ethers.getContractFactory("Token", deployer);
    erc20 = await erc20Factory.deploy();
    await erc20.deployed();
  });

  describe("constructor", () => {
    it("should set msg.sender = owner", async function () {
      owner = await erc20.owner();
      //console.log("owner:--------------- ", owner);
      assert.equal(owner, deployer.address);
    });

    it("should set the initial supply to 10000000", async function () {
      let totalSupply = await erc20.balanceOf(owner);
      assert.equal(initialSupply, totalSupply);
    });
    it("should check if the totalSupply == initialSupply", async function () {
      let totalSupplyContract = await erc20.totalSupply();
      assert.equal(initialSupply, totalSupplyContract);
    });
    it("onlyOwner shoud be able to mint, otherwise should be reverted with message", async function () {
      const erc20Custom = await erc20.connect(addr1);
      //console.log("sddhdsfhbf----------------------------", erc20Custom);
      await expect(
        erc20Custom.functions.mint(erc20Custom.address, tt)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("only owner should be able to burn, else revert with message", async function () {
      const erc20Custom = await erc20.connect(addr1);
      await expect(
        erc20Custom.burn(erc20Custom.address, temp)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});

async function addSnapshotBeforeRestoreAfterEach() {
  let lastSnapshotId;
  beforeEach(async () => {
    lastSnapshotId = await takeSnapshot();
  });

  afterEach(async () => {
    await restoreSnapshot(lastSnapshotId);
  });
}
async function takeSnapshot() {
  const result = await ethers.provider.send("evm_snapshot", []);

  await mineBlock();

  return result;
}

async function restoreSnapshot(id) {
  await ethers.provider.send("evm_revert", [id]);
  await mineBlock();
}

const mineBlock = async () => await ethers.provider.send("evm_mine", []);
