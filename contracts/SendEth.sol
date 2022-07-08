//SPDX-License-Identifier: Unlicense
pragma solidity ^ 0.8.8;



// datafeeds from chainlink => still not sure if i need them (noob stuff)
//import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";


//OpenZeppelin library for ERC20 tokens
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

//include all the code we need to send a Chainlink oracle
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";



//contract                   or AggregatorV3Interface
contract TokenTransfer is Oracle { 

    // instance variable of type oracle 
    Oracle private oracleInstance;

    //saving the latest price in a variable
    uint256 public price = oracleInstance.getLatestPrice();


    address public owner;
    uint256 public balance;

    //events 
    event TransferReceived(address _from, uint _amount);
    event TransferSent(address _from, address _destAddr, uint amount);


    // constructor setting the usdc token address
    constructor () VRFConsumerbase(
        0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d // USDc token
    ) public {
        owner = msg.sender;
    }

    receive() payable external {
        balance +=msg.value;
        emit TransferReceived(msg.sender, msg.value);

    }

    //function to withdraw 
    function withdraw(uint _amount, address payable _destAddr) public {

        require(msg.sender == owner, "You are not the owner");
        require(_amount <= balance, "Insufficient funds");

        destAddr.transfer(_amount);
        balance -= _amount;
        emit TransferSent(msg.sender, _destAddr, _amount);

    }

    //function to transfer, dont think this is the right one tho, need to check
    function TransferERC20(IERC20 token, address _to, uint256 _amount) public {


        require(msg.sender == owner, "Only owner can send tokens");

        uint256 erc20balance = token.balanceOf(address(this));

        require(erc20balance >= _amount, "Insuffiecient funds");

        token.transferTo(_to, _amount);
        emit TransferSent(msg.sender, _to, _amount);
    }

    function GetBalance() public {
        return balance;
    }

    

}