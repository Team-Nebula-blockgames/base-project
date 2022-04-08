// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @notice Transfer equal tokens amount to multiple addresses
contract MultiTransferTokenEqual is Ownable {
    using SafeERC20 for IERC20;

    /** 
  @notice Send equal ERC20 tokens amount to multiple addresses
  @param _token The token to send
  @param _addresses Array of addresses to send to
  @param _amount Tokens amount to send to each address

*/

    function multiSend(
        address _token,
        address[] calldata _addresses,
        uint256 _amount
    ) external payable onlyOwner {
        require(_addresses.length <= 200, "Max of 200 addresses");

        uint256 _amountSum = _amount * (_addresses.length);
        IERC20 token = IERC20(_token);

        require(
            token.balanceOf(msg.sender) >= _amountSum,
            "Token Balance is Low, mint more tokens to send"
        );
        token.safeTransferFrom(msg.sender, address(this), _amountSum);
        for (uint8 i; i < _addresses.length; i++) {
            token.safeTransfer(_addresses[i], _amount);
        }
    }
}
