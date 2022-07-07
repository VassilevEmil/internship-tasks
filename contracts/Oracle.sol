// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Rinkeby
     * Aggregator: ETH/USDc
     * Address: 0xdCA36F27cbC4E38aE16C4E9f99D39b42337F6dcf
     */
    constructor() {
        priceFeed = AggregatorV3Interface(0xdCA36F27cbC4E38aE16C4E9f99D39b42337F6dcf);
    }

    /**
     * Returns the latest price
     */
    
       function getLatestPrice() public view returns (int) {
    (,int price,,,) = priceFeed.latestRoundData();
    return price;
  }


    /**
    *returning the sum in human-readable decimal number
     */
     
    function getDecimals() public view returns(uint8){
      uint8 decimals = priceFeed.decimals();
      return decimals;
  }


  

}
