// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./INestcoin.sol";

/// @notice Transfer equal tokens amount to multiple addresses
contract MultiTransferTokenEqual is Ownable, Pausable {
    using SafeERC20 for INestcoin;
    event Recieved(address _sender, uint256 _amount);
    event WithdrawEther(address _reciever, uint256 _amount);

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
    ) external whenNotPaused {
        INestcoin token = INestcoin(_token);
        require(token.isAdmin(msg.sender), "You are not an admin");
        require(_addresses.length <= 200, "Max of 200 addresses");

        uint256 _amountSum = _amount * (_addresses.length) * 10**18;

        require(
            token.balanceOf(msg.sender) >= _amountSum,
            "Insufficient token balance"
        );
        token.safeTransferFrom(msg.sender, address(this), _amountSum);
        for (uint8 i; i < _addresses.length; i++) {
            token.safeTransfer(_addresses[i], _amount * 10**18);
        }
    }

    receive() external payable {
        emit Recieved(msg.sender, msg.value);
    }

    /// @dev Notice callers if functions that do not exist are called
    fallback() external payable {
        require(msg.data.length == 0);
    }

    /// @notice Withdraw all ETH from contract to owners address.
    function withdrawEther() external payable onlyOwner {
        (bool sent, ) = payable(msg.sender).call{value: address(this).balance}(
            ""
        );
        require(sent, "Failed to send Ether");
        emit WithdrawEther(msg.sender, address(this).balance);
    }

    /// @dev Emergency stop contract in a case of a critical security flaw.
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
