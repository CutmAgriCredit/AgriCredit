pragma solidity ^0.4.17;

contract Loan {
    address[] public user_db;
    address user;
    address[] public sender_db;
    address[] public receiver_db;
    uint[] public value;
    address[] public Borrow;
    address[] public loan_db;
    uint[] public value2;

    function signUp() public {

        user_db.push(msg.sender);
    }

    function Lend(address borrower) public payable{
        user=borrower;
        user.transfer(msg.value);
        sender_db.push(msg.sender);
        receiver_db.push(borrower);
        value.push(msg.value);
    }

    function Borrow() public payable{
        loan_db.push(msg.sender);
        value2.push(msg.value);
    }

    function getUserDatabase() public view returns (address[]){
        return user_db;
    }
    function getAddress() public view returns (address){
        return user;
    }
    function getSenderAddress() public view returns (address[]){

        return sender_db;
    }
    function getReceiverAddress() public view returns (address[]){

        return receiver_db;
    }
    function getValue() public view returns (uint[]){
        return value;
    }
    function getLoanAddress() public view returns (address[]){
        return loan_db;
    }
    function getLoanValue() public view returns (uint[]){
        return value2;
    }
}
