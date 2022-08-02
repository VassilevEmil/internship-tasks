const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const BN = require("bn.js");

//const initialSupply = new BN(10000000);
//let initialSupply;
let erc20;
let owner;

// addSnapshotBeforeRestoreAfterEach();

describe("ERC20", async function () {
  let erc20;
  let deployer;
  let erc20Factory;
  let owner;
  const initialSupply = 10000000 * 10 ** 18;

  this.beforeAll(async function () {
    [deployer] = await ethers.getSigners();
    erc20Factory = await ethers.getContractFactory("Token", deployer);
    erc20 = await erc20Factory.deploy();
    await erc20.deployed();
  });

  describe("constructor", () => {
    it("should set msg.sender = owner", async function () {
      owner = await erc20.owner();
      console.log("owner:--------------- ", owner);
      assert.equal(owner, deployer.address);
    });

    it("should set the initial supply to 10000000", async function () {
      //initialSupply = what if i create a function initialSupply() returns (uint256) in token.sol and call that function from here???
      let totalSupply = await erc20.balanceOf(owner);
      assert.equal(initialSupply, totalSupply);
    });
    it("should check if the totalSupply == initialSupply", async function () {
      let totalSupplyContract = await erc20.totalSupply();
      assert.equal(initialSupply, totalSupplyContract);
    });
  });
});

// async function addSnapshotBeforeRestoreAfterEach() {
//   let lastSnapshotId;
//   beforeEach(async () => {
//     lastSnapshotId = await takeSnapshot();
//   });

//   afterEach(async () => {
//     await restoreSnapshot(lastSnapshotId);
//   });
// }
// async function takeSnapshot() {
//   const result = await ethers.provider.send("evm_snapshot", []);

//   await mineBlock();

//   return result;
// }

// async function restoreSnapshot(id) {
//   await ethers.provider.send("evm_revert", [id]);
//   await mineBlock();
// }

// const mineBlock = async () => await ethers.provider.send("evm_mine", []);
