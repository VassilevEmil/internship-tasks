//import "./tasks/ERC721";
require("@nomiclabs/hardhat-etherscan");
require("./tasks");
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.16",
  networks: {
    rinkeby: {
      url: "${process.env.INFURA_PK}",
      accounts: process.env.PRIVATE_KEY,
    },
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
};
