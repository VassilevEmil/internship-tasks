//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// importing and inheriting different standarts as to be able to use
// their functionalities

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Nft is Ownable, ERC721URIStorage {
    // declare a counter so we can keep track of the total minted tokens

    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;

    uint256 mintFee = 0.2 * 10**18;

    constructor() ERC721("Token", "Tkn") {}

    // minting should only happen if we deposit some money

    function mint(address to, string memory _tokenURI)
        public
        payable
        returns (uint256)
    {
        // require(
        //     msg.value == mintFee,
        //     "should provide some eth in order to mint"
        // );

        currentTokenId.increment();
        uint256 newTokenId = currentTokenId.current();
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        return newTokenId;
    }

    function burn(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
    }
}
