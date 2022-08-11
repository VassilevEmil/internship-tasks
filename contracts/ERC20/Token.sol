// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// importing and inheriting ERC20 so we can use its functionalities

contract Token is ERC20, Ownable {
    //10000000**10**18 because solidity doesnt have floating point
    uint256 public _initialSupply = 10000000 * 10**18;

    // constructor setting the initialsupply and owner
    constructor() ERC20("Test", "SMB") {
        _mint(owner(), _initialSupply);
    }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public onlyOwner {
        _burn(account, amount);
    }

    function transfer(
        address from,
        address to,
        uint256 amount
    ) public onlyOwner {
        _transfer(from, to, amount);
    }
}
