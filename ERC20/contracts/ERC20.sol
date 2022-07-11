pragma solidity ^ 0.8.0;


contract Token{

    //who owns the contract
    address public owner;

    //eventually we will need a total supply
    uint256 _totalSupply;

    uint256 _balances;

    //constructor setting the initialsupply and owner
    constructor (uint256 _initialSupply)  {
        owner = msg.sender;
        _initialSupply = 10000000;

    
    }

    event Transfer(address account, uint256 amount); 

//access modifier
modifier onlyOwner {

    require(msg.sender == owner);
    _;
}

 function _mint(address account, uint256 amount) internal virtual onlyOwner {
        require(account != address(0), "ERC20: mint to the zero address");
        require(owner == msg.sender, "only the owner can mint");

       

        _totalSupply += amount;
        

        //unchecked block used to obtain previous behaviour && for gas optimisation
        unchecked {
            // Overflow not possible: balance + amount is at most totalSupply + amount, which is checked above.
            _balances[account] += amount;
        }
        emit Transfer(address(0), account, amount);

}

  function _burn(address account, uint256 amount) internal virtual onlyOwner {
        require(account != address(0), "ERC20: burn from the zero address");
        require(owner == msg.sender, "only owner can burn");


        

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
            // Overflow not possible: amount <= accountBalance <= totalSupply.
            _totalSupply -= amount;
        }

        emit Transfer(account, address(0), amount);

      
    }

}