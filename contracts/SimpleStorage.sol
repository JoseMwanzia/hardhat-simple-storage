 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
    uint favoriteNumber;
    People public person = People({name: "Patrick", favoriteNumber: 2});

    People[] public people;
    mapping(string => string) public nameToFavoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _name;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }
}
