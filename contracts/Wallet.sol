// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Wallet {
    address payable public owner;

    constructor(address payable _owner) {
        // owner = payable(msg.sender);
        owner = _owner;
    }

    // constructor() {
    //     owner = payable(msg.sender);
    // }

    function deposit() public payable {}

    function checkBalance() public view returns(uint balance) {
        // return owner.balance;
        return address(this).balance;
    }

    function send(address payable to,uint amount) public  {
        if(msg.sender == owner) {
            to.transfer(amount);
            return;
        }
        revert("Sender is not allowed");
    }
}