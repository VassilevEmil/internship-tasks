//SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

// importing and inheriting different standarts as to be able to use
// their functionalities

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract Nft is ERC721, ERC721Burnable, Ownable {
    // declare a counter so we can keep track of the total minted tokens

    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;

    uint256 mintFee = 0.2 * 10**18;

    constructor() ERC721("Token", "Tkn") {}

    function mint(address to) public payable returns (uint256) {
        require(
            msg.value == mintFee,
            "should provide some eth in order to mint"
        );

        currentTokenId.increment();
        uint256 newTokenId = currentTokenId.current();
        _mint(to, newTokenId);
        return newTokenId;
    }

    function baseURI() public pure virtual returns (string memory) {
        return "ipfs://QmWhGaQQXxyQmnFCgnfhLb8QLWLrqdgViC6F5mXdLCMLqt/";
    }

    function tokenURI(uint256 _tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(baseURI(), Strings.toString(_tokenId), ".json")
            );
    }
}
