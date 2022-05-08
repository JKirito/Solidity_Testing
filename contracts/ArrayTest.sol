// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract ArrayTest {
    uint[] public list;

    function add(uint _num) public {
        list.push(_num);
    }

    function get(uint _index) public view returns(uint _item) {
        return list[_index];
    }

    function getAll() public view returns(uint[] memory _array) {
        return list;
    }

    function length() public view returns(uint _length) {
        return list.length;
    }

}