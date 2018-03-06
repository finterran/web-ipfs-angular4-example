pragma solidity ^0.4.18;

contract SimpleStorage {
    string storedData;

    function set(string x) public {
        storedData = x;
    }

    function get() public constant returns (string) {
        return storedData;
    }
}