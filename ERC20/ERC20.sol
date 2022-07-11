pragma ^ 0.8.6;


contract Token{

    //who owns the contract
    address public owner;

    //eventually we will need a total supply
    uint256 totalSupply;

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

       

        totalSupply += amount;

        //unchecked block used to obtain previous behaviour && for gas optimisation
        unchecked {
            // Overflow not possible: balance + amount is at most totalSupply + amount, which is checked above.
            _balances[account] += amount;
        }
        emit Transfer(address(0), account, amount);
    


}
}