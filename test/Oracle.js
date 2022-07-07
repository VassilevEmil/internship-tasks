const { expect } = require("chai");
const { Contract } = require("ethers");
const { ethers, artifacts } = require("hardhat");
const Oracle = artifacts.require("Oracle");
const SendEth = artifacts.require("SendEth");
const {expectRevert} = require('@openzeppelin/test-helpers');
const priceFeed - new ethers.Contract()

contract('Oracle', () => {

  let oracle;
  let sendEth;
  let price;


})

  beforeEach(async () => {
    //idk, saw it and thought it would be good to be here
    oracle = await Oracle.deployed();
    
    
    
  })

  it("Should fetch the latest price", () => {

    oracle.getLatestPrice(
      price

    );
    

    expect(await oracleInstance.getLatestPrice()

  }
