const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const BN = require("bn.js");
const { base58, hexStripZeros } = require("ethers/lib/utils");

//addSnapshotBeforeRestoreAfterEach();

describe("ERC721", async function () {
  let erc721;
  let deployer;
  let erc721Factory;
  const fee = ethers.utils.parseEther("0.2");
  const id = ethers.utils.parseEther("1");
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

      // checks if the balances have incresed/decreased
      await expect(
        await erc721.mint(erc721.address, tokenUri, { value: fee })
      ).to.changeEtherBalance(deployer, fee.mul(-1));
    });

    // should have a minted token before you burn
    it("The token owner should be able to burn", async function () {
      const tokenUri = "tokenURI";

      await erc721.mint(deployer.address, tokenUri, { value: fee });

      expect(await erc721.burn(1));
    });
    it("Should not be burned from unauthorized parties", async function () {
      const tokenUri = "tokenURI";
      await erc721.mint(deployer.address, tokenUri, { value: fee });
      const temp1 = await erc721.connect(addr1);
      await expect(temp1.burn(1)).to.be.revertedWith(
        "ERC721: caller is not token owner nor approved"
      );
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
