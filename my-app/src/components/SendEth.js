import React, { useState } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { ethers } from "ethers";

//const abiFile = require("../TokenABI");
//const send_account = require("../contracts/index");

// const tx = {
//     from: send_account,
//     to: to_address,
//     value: ethers.utils.parseEther(send_token_amount),
//     nonce: window.ethersProvider.getTransactionCount(send_account, "latest"),
//     gasLimit: ethers.utils.hexlify(gas_limit), // 100000
//     gasPrice: gas_price,
//   }

async function sendTransaction({ ether, addr }) {
  try {
    if (!window.ethereum) throw new Error("Connect your crypto wallet");
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether),
    });
    console.log({ ether, addr });
  } catch (err) {
    console.log(err);
  }
}

export default function Transfer() {
  return (
    <Flex direction="column" align="center" mt="4">
      <Text color="white" fontSize="8xl"></Text>
      <Button colorScheme="teal" size="lg">
        Send ETH
      </Button>
    </Flex>
  );
}
