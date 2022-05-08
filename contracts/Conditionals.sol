// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Conditionals {

    function check(uint a,uint b) public pure returns(uint _c) {
        uint c;
        require(a>b,"A should be greater than b");
        c = a;
        return c;
    }
}