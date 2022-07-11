const { expect, Assertion, assert } = require("chai");
const { Contract } = require("ethers");
const { ethers, artifacts } = require("hardhat");
const Erc20 = artifacts.require("ERC20");

contract('ERC20', () => {

    const initialSupply = new BN(100);

})


addSnapshotBeforeRestoreAfterEach();

beforeAll(async () => {
    describe("Setting the constructor", () => {

        it("should set msg.sender == owner", () => {
             
        }),

        it("should set the initial supply to 10000000", () => {
            const initialSupply = 10000000;
            assert(initialSupply).equal(10000000);
        })

    })
})


// saw this from openzeppelin -- ask roskata regarding BN

describe("mint()", () => {
    const amount = new BN(50);
    it("rejects a null account", () => {
        
        await expectRevert(
            this.token.mint(ZERO_ADDRESS, amount), 'ERC20: mint to the zero address',
          );
    })
})

describe('_burn', function () {
    it('rejects a null account', async function () {
      await expectRevert(this.token.burn(ZERO_ADDRESS, new BN(1)),
        'ERC20: burn from the zero address');
    });




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
