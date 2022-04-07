// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Nestcoin is ERC20, Ownable {
    constructor() ERC20("Nestcoin", "NTC") {}

    function mint(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount * 10**18);
    }

    function approveMulti(
        uint256 amount,
        address account,
        uint256 list
    ) external onlyOwner {
        approve(account, (amount * list * 10**18));
    }
}
