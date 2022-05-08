// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract TransferAmount {

    address owner;
    
    constructor(address _owner) {
        owner = _owner;
    }

    function send(address payable[] memory to, uint256[] memory amount)
        public
        payable
        ownerOnly
    {
        require(to.length == amount.length, "to must be same length as amount");
        for (uint256 i = 0; i < to.length; i++) {
            to[i].transfer(amount[i]); //to array  - 0x00 0x01 0x02
                                    //amount array - 10 20 30
        }
    }

    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }
}