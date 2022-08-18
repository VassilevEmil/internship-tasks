const { ethers, Contract } = require("ethers");
const { task } = require("hardhat/config");

require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-toolbox");

task("deployERC721", "deploying the smart contract").setAction(
  async (taskArgs, hre) => {
    console.log("deploying ERC721 contract.............");
    const Nft = await hre.ethers.getContractFactory("Nft");
    const nft = await Nft.deploy();
    await nft.deployed();

    console.log("ERC721 contract address: " + nft.address);
  }
);

task("mint721", "Mint Nfts")
  .addParam("to", "to which address the nft should be minted")
  .addParam("tokenuri", "where the nft image has to be hosted")
  .addParam("address", "Contract`s address")
  .setAction(async (taskArgs, hre) => {
    try {
      const Nft = await hre.ethers.getContractFactory("Nft");
      const nft = Nft.attach(taskArgs.address);
      console.log("Minting nfts");
      const tx = await nft.mint(taskArgs.to, taskArgs.tokenuri);
      await tx.wait();
      console.log("transaction hash: " + tx.hash);
    } catch (error) {
      console.log(error.message);
    }
  });

task("burn721", "Burn Nfts")
  .addParam("tokenId", "the unique nft identifier")
  .addParam("address", "contract`s address")
  .setAction(async (taskArgs, hre) => {
    try {
      const Nft = await hre.ethers.getContractFactory("Nft");
      const nft = Nft.attach(taskArgs.address);
      console.log("burning nft");

      const tx = await nft.burn(taskArgs.tokenId);
      await tx.wait();
      console.log(tx.hash);
      console.log("Nft with id " + taskArgs.tokenId + " has been burned ");
    } catch (error) {
      console.log(error.message);
    }
  });
