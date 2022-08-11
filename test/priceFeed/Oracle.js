const { expect, assert } = require("chai");
const hre = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

addSnapshotBeforeRestoreAfterEach();

describe("Oracle", async () => {
  let Price_ETH;

  before(async () => {
    //deployer = await ethers.getSigners();
    const oracleFactory = await ethers.getContractFactory("Price_ETH");
    Price_ETH = await oracleFactory.deploy();
    await Price_ETH.deployed();
  });

  describe("getPrice()", () => {
    it("should return the price in integer", () => {
      deployer = ethers.getSigners();
      let price = Price_ETH.getLatestPrice();

      assert.equal(!price, 0000);
      //need to find a way to check if the price is returned as interger
      //assert.equal(price,);
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
