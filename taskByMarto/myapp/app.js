const express = require("express");
const app = express();
const port = 3000;
const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();
import Oracle from "Oracle.js";
let oracle;

const updatePassword = require("./updatePassword");

// method to fetch the price if we dont fetch it through our smart contract
// i know it doesnt make our code 'clean' by having this here
let data = CoinGeckoClient.exchanges.fetch("chainlink", {
  coin_ids: ["bitcoin"],
});

//5 minutes into milliseconds
let minutes = 5 * 60 * 3000;

function updatePrice() {
  //method to update the price on every **minutes**
  oracle = Oracle.getThePrice();
  oracle.setTimeout(() => {}, minutes);
  console.log("price is getting updated on every 5 minutes");
}

module.exports = updatePrice;
