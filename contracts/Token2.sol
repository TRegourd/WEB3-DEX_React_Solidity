// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/hardhat/console.sol";

contract Token2 is ERC20, Ownable {
    constructor() ERC20("Token2", "TKN2") {
        _mint(msg.sender, 1000);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
