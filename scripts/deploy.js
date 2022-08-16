/*
async function main() {
  const [deployer] = await ethers.getSigners();
  const hre = require("hardhat");

  console.log("Deploying contracts with the account:", deployer.address);

  //console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Price_ETH");
  const token = await Token.deploy();

  console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  */

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Nft = await ethers.getContractFactory("Nft");
  const nft = await Nft.deploy();

  console.log("nft address:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
