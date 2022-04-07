// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Nestcoin is ERC20, Ownable {
    constructor() ERC20("Nestcoin", "NTC") {}

    function mint(uint256 amount) public onlyOwner {
<<<<<<< HEAD
        _mint(msg.sender, amount);
        _approve(msg.sender, msg.sender, balanceOf(msg.sender));
=======
        _mint(msg.sender, amount * 10**18);
>>>>>>> 3984e533616dc145d563cd49a84090c4b4bb9d12
    }
}
