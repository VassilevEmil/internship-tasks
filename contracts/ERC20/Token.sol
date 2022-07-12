//SPDX-License-Identifier
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//importing and inheriting ERC20 so we can use its functionalities

contract Token is ERC20, Ownable {
    //who owns the contract
    address public _owner;
    //eventually we will need a total supply
    uint256 _totalSupply;
    //variable to keep track of the balance
    uint256 _balances;

    //10000000**10**18 because solidity doesnt have floating point
    uint256 _initialSupply = 10000000 * 10 * 18;

    event Transfer(address account, uint256 amount);

    //constructor setting the initialsupply and owner
    constructor() ERC20("Test", "SMB") {
        _mint(_owner, _initialSupply);
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public {
        _burn(account, amount);
    }
}
