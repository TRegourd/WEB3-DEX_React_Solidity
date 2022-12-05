// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract RewardToken is ERC20, ERC20Burnable, Ownable {
    address stakingContract;

    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {}

    function setStakingContract(address _stakingContract) public onlyOwner {
        stakingContract = _stakingContract;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == stakingContract, "Not the staking contract");
        _mint(to, amount);
    }
}
