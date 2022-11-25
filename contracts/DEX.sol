// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/hardhat/console.sol";

interface IOracle {
    function getPrice() external view returns (uint256);
}

contract DEX is Ownable {
    mapping(string => IOracle) public oracles;
    mapping(string => address) public tokens;

    function setOracle(string memory _symbol, IOracle _oracle)
        public
        onlyOwner
    {
        oracles[_symbol] = _oracle;
    }

    function setToken(string memory _symbol, address _token) public onlyOwner {
        require(_token != address(0x0));
        require(
            keccak256(abi.encodePacked((ERC20(_token).symbol()))) ==
                keccak256(abi.encodePacked((_symbol))),
            "Invalid Symbol or contract address"
        );
        tokens[_symbol] = _token;
    }

    function addLiquidity(string memory _symbol, uint256 _amount)
        public
        onlyOwner
    {
        bool liquidityAdded = IERC20(tokens[_symbol]).transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        require(liquidityAdded);
    }

    function swap(
        string memory _from,
        string memory _to,
        uint256 _amount
    ) public {
        address from = tokens[_from];
        address to = tokens[_to];
        require(from != address(0x0) && to != address(0x0), "Invalid tokens");
        require(
            IERC20(to).balanceOf(address(this)) >= _amount,
            "Insuficient Dex Liquidity"
        );
        require(
            IERC20(from).balanceOf(msg.sender) >= _amount,
            "Insuficient Swaper Balance"
        );

        uint256 fromPrice = oracles[_from].getPrice();
        uint256 toPrice = oracles[_to].getPrice();

        // FIXME : Find a way to calculate swapRatio when ratio is a float number.

        uint256 swapAmount = (fromPrice / toPrice) * _amount;

        bool transferToDex = IERC20(from).transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        bool approveDex = IERC20(to).approve(address(this), swapAmount);
        bool transferToUser = IERC20(to).transferFrom(
            address(this),
            msg.sender,
            swapAmount
        );
        require(transferToDex && transferToUser && approveDex);
    }
}
