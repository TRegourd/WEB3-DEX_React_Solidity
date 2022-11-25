// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/hardhat/console.sol";

contract MyOracle is Ownable {
    event priceUpdated(uint256 newPrice);

    uint256 tokenPrice = 0.001 ether;

    function updatePrice(uint256 _newPrice) public onlyOwner {
        tokenPrice = _newPrice;
        emit priceUpdated(_newPrice);
    }

    function getPrice() public view returns (uint256) {
        return tokenPrice;
    }
}
