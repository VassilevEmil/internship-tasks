import { ethers } from "ethers";
import React, { useState } from "react";

//const provider = await detectEthereumProvider();

const WalletInit = () => {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [errorMessage, setErrorMessge] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
        });
    } else {
      setErrorMessge("Install Metamask");
    }

    const accountChangedHandler = (newAccount) => {
      setDefaultAccount(newAccount);
      getUserBalance(newAccount.toString());
    };

    const getUserBalance = (address) => {
      window.ethereum
        .request({ method: "eth_getBalance", params: [address, "latest"] })
        .then((balance) => {
          setUserBalance(ethers.utils.formatEther(balance));
        });
    };

    window.ethereum.on("accountsChanged", accountChangedHandler);
  };

  return (
    <div className="walletInit">
      <h4>Connect to your wallet</h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div className="accountDisplay">
        <h3>Address: {defaultAccount}</h3>
      </div>
      <div className="balance">
        <h3>Balance: {userBalance}</h3>
      </div>
    </div>
  );
};

export default WalletInit;
