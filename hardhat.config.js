const { ethers } = require("ethers");
const { task } = require("hardhat/config");

require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-toolbox");

task("deploy", "deploying the smart contract").setAction(
  async (taskArgs, hre) => {
    console.log("");
    console.log("deploying contract.........");
    const Token = await hre.ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.deployed();

    console.log("");

    console.log("contract address: " + token.address);
    console.log("");
  }
);

task("mint", "Mint tokens")
  .addParam("account", "the account`s address")
  .addParam("amount", "the amount that has to be minted")
  .setAction(async (taskArgs, hre) => {
    try {
      const Token = await hre.ethers.getContractFactory("Token");
      const token = await Token.deploy();
      await token.deployed();
      console.log("Minting tokens");
      const tx = await token.mint(taskArgs.account, taskArgs.amount);
      await tx.wait();
      console.log(tx.hash);
    } catch (error) {
      console.log(error.message);
    }
  });
task("burn", "burn tokens")
  .addParam("account", "the account`s address")
  .addParam("amount", "the amount that has to be burned!")
  .setAction(async (taskArgs, hre) => {
    try {
      const Token = await hre.ethers.getContractFactory("Token");
      const token = await Token.deploy();
      await token.deployed();

      console.log("burning tokens.....");

      const tx = await token.burn(taskArgs.account, taskArgs.amount);
      await tx.wait();
      console.log(tx.hash);

      //await token.burn(taskArgs.account, taskArgs.amount);

      console.log("The amount of " + taskArgs.amount + " has been burned");
    } catch (error) {
      console.log(error.message);
    }
  });

task("transfer", "transfer tokens")
  .addParam("token", "token address")
  .addParam("spender", "Spender address")
  .addParam("amount", "amount to be transfered")
  .setAction(async ({ token, spender, amount }, hre) => {
    try {
      console.log("Transfering tokens........");

      const Token = await hre.ethers.getContractFactory("Token");
      //attach() => returns a new instance of the contract attached to a new address
      const tokentoken = Token.attach(token);

      const [minter] = await hre.ethers.getSigners();
      await (await tokentoken.connect(minter).transfer(spender, amount)).wait();

      // await token.transfer(taskArgs.to, taskArgs.amount);

      console.log(`${minter.address} has transfered ${amount} to ${spender}`);
    } catch (error) {
      console.log(error.message);
    }
  });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
};
