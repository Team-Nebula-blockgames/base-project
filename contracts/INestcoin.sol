// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface INestcoin is IERC20 {
    /**
     * @dev Returns true if _address is admin.
     */
    function isAdmin(address _address) external view returns (bool);
}
