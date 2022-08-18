//import "./tasks/ERC721";
require("@nomiclabs/hardhat-etherscan");
require("./tasks");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      // expose vulnerability, will change it later

      url: "https://rinkeby.infura.io/v3/7ee27a75ab7d4e0c97303c78358181de",
      accounts: [
        "aa91cde3ba7f0ea25c98271655989772e64062b96186827139971828a0e9ce6c",
      ],
    },
  },
  etherscan: {
    apiKey: "UU2SW7FFNSST6BREZRXV4FSD2TYWIHF1PS",
  },
};
