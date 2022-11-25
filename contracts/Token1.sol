// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/hardhat/console.sol";

contract Token1 is ERC20, Ownable {
    constructor() ERC20("Token1", "TKN1") {
        _mint(msg.sender, 100);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
