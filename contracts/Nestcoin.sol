// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./AccessControl.sol";

contract Nestcoin is ERC20, Ownable, AccessControl {
    constructor() ERC20("Nestcoin", "NTC") {}

    function mint(uint256 amount) public onlyRole(ADMIN) {
        _mint(msg.sender, amount * 10**18);
    }

    function destroy() public onlyOwner{
        selfdestruct(payable(owner()));
    }
}
