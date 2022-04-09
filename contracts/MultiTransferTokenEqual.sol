// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./INestcoin.sol";

/// @notice Transfer equal tokens amount to multiple addresses
contract MultiTransferTokenEqual is Ownable, Pausable {
    using SafeERC20 for INestcoin;

    event BatchTransfer(uint256 batchSize, uint256 amount);

    mapping(address => uint256) public ticket;
    uint256 public ticketPrice = 50 * 10**18; //50 NTC Tokens per ticket

    /** 
    @notice Send equal ERC20 tokens amount to multiple addresses
    @param _token Address of the NTC token
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
            "Insufficient token balance."
        );
        token.safeTransferFrom(msg.sender, address(this), _amountSum);
        for (uint8 i; i < _addresses.length; i++) {
            token.safeTransfer(_addresses[i], _amount * 10**18);
        }
        emit BatchTransfer(_addresses.length, _amount);
    }

    /** 
    @notice Exchange NTC tokens for tickets
    @param _token Address of the NTC token
   */
    function claimTicket(address _token) external whenNotPaused {
        INestcoin token = INestcoin(_token);
        require(
            token.balanceOf(msg.sender) >= ticketPrice,
            "Insufficient token balance."
        );
        require(!token.isAdmin(msg.sender), "Admins cannot claim tickets.");
        token.safeTransferFrom(msg.sender, owner(), ticketPrice);
        ticket[msg.sender]++;
    }

    /**
     * @notice Emergency stop contract in a case of a critical security flaw.
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @notice Switch to allow batch transfer of tokens.
     */
    function unpause() public onlyOwner {
        _unpause();
    }
}
