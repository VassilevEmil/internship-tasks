const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const BN = require("bn.js");
const { base58 } = require("ethers/lib/utils");

describe('ERC721', async function () {
    let erc721;
    let deployer;
    let erc721Factory;
    let owner;
    let addr1;

    this.beforeAll(async function() {
        [deployer] = await ethers.getSigners();
        erc721Factory = await ethers.getContractFactory("Nft", deployer);
        erc721 = erc721Factory.deploy();
        await erc721.deployed();
    });

    describe("Nft contract", () => {
        it("should send some eth in order to mint", async function() {
            const erc721Custom = await erc721.connect(deployer);
            await expect(
                erc721Custom.functions.mint(erc) {
                    
                }
            )
        })

        it("should be able to withdraw(burn)", async function () {
            const erc721Custom = await erc721.connect(deployer);
            await expect(
                erc721Custom.burn(erc721)
            )
        })
    })
  
})
