const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Oracle.sol", () => {

  it("Should fetch the latest price", async function () {
    const oracleInstance = await Oracle;
    const result = await oracleInstance.getLatestPrice

    expect(await oracleInstance.getLatestPrice()

  }
