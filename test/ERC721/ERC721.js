const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const BN = require("bn.js");
const { base58 } = require("ethers/lib/utils");

addSnapshotBeforeRestoreAfterEach();

describe("ERC721", async function () {
  let erc721;
  let deployer;
  let erc721Factory;
  const fee = ethers.utils.parseEther("0.1");
  let addr1;
  let owner;

  // for testing burn functionality
  // create a temp which represents the tokenId;
  const temp = 1;

  // for testing withdraw functionality
  // amount representing eth;
  const amount = 10;

  this.beforeAll(async function () {
    [deployer, addr1] = await ethers.getSigners();
    erc721Factory = await ethers.getContractFactory("Nft", deployer);
    erc721 = await erc721Factory.deploy();
    await erc721.deployed();
  });

  describe("Nft contract", () => {
    it("should send some eth in order to mint", async function () {
      // need to pass the tokenUri from the code
      const tokenUri = "tokenURI";

      const erc721Custom = await erc721.connect(deployer);

      // checks firstly if we are able to mint
      expect(erc721Custom.functions.mint(erc721Custom.address, tokenUri));

      // checks the balance of the
      await expect(
        await addr1.sendTransaction({ to: deployer.address, value: fee })
      ).to.changeEtherBalance(deployer, fee);
    });

    it("The token owner should be able to burn", async function () {
      const erc721Custom = await erc721.connect(deployer);
      //let id = erc721.
      await expect(
        erc721Custom.burn(erc721Custom.address, temp)
      ).to.be.revertedWith("Only the token owner should be able to burn");
    });
    it(" only owner should be able to withdraw the balance from the contract", async function () {
      const erc20Custom = await erc721.connect(addr1);
      // owner = await erc721.owner();
      expect(erc20Custom.functions.withdraw(amount)).to.be.revertedWith(
        "Only contract owner can withdraw funds"
      );
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
