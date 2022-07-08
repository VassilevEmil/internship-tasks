const { expect, Assertion, assert } = require("chai");
const { Contract } = require("ethers");
const { ethers, artifacts } = require("hardhat");
const Oracle = artifacts.require("Oracle");
const SendEth = artifacts.require("SendEth");
const {expectRevert} = require('@openzeppelin/test-helpers');
const priceFeed = new ethers.Contract()

contract('Oracle', () => {

  let oracle;
  let sendEth;
  
  let balance;
  let amount;

})


addSnapshotBeforeRestoreAfterEach();

  beforeAll(async () => {

   //
   describe("Setting the constructor", () => {

    it("should set ETH/USDc address", () => {


    })
  })


  //should check if it returns a price!

  describe("GetLatestPrice()", () => {
    
  it("should return the price of eth", () => {
    const temp = oracle.getLatestPrice();
    assert(temp).equal(price);

  })

  })


  it("should return the result in decimal", () => {

  const decimalPrice = oracle.getDecimals();

  expect(decimalPrice)
  })


  describe("Withdraw()", ()  => {

    it("msg.sender should be the owner", () =>{
      assert.equal(oracle.owner(), this);
    })

    it("Balance >= amount, else revert", () => {
      balance = oracle.GetBalance();
      expect(temp).to.be.reverted("not sufficient balance");
    })

    // how to check 'destAddr.transfer(_amount)' ? => ask roskata

    it("should transfer the amount to the destination address", () => {

    })

    it("should deduct the transfered amount from the balance", () => {
      balance = oracle.GetBalance();
      const balanceAfter = balance - amount;
      expect(balanceAfter).to.be.!equal(balance);

      //can we import SafeMath from openzeppelin and use the 
      //substract method and to make it like
      // const result = sub(balance, balanceAfter)
      // and then we do: assert.equal(result, 2);


    })

    it("should emit the transfer", () => {


    }

  

  })



  it("should be able to transfer", () => {


  })


  async function addSnapshotBeforeRestoreAfterEach()  {
    let lastSnapshotId
    beforeEach(async () => {
      lastSnapshotId = await takeSnapshot();
    });
  
    afterEach(async () => {
      await restoreSnapshot(lastSnapshotId);
    });
  }
  async function takeSnapshot() {
    const result = await ethers.provider.send('evm_snapshot', []);
  
    await mineBlock();
  
    return result;
  }
  
  async function restoreSnapshot(id) {
    await ethers.provider.send('evm_revert', [id]);
    await mineBlock();
  }
  
  const mineBlock = async () => await ethers.provider.send('evm_mine', []);
