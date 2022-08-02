const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const initialSupply = new BN(10000000);
let erc20;
let owner;
let deployer;

addSnapshotBeforeRestoreAfterEach();

describe("ERC20", async function () {
  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const erc20Factory = await ethers.getContractFactory("Token");
    erc20 = await erc20Factory.deploy([deployer]);
    await erc20.deployed();
  });

  describe("constructor", () => {
    it("should set msg.sender = owner", () => {
      owner = erc20.owner();
      assert.equal(owner, msgSender);
    });

    it("should set the initial supply to 10000000", () => {
      const initialSupply = 10000000;
      assert.equal(initialSupply, 10000000);
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
