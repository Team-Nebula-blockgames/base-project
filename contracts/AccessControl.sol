// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @dev All function calls are currently implemented without side effects
contract AccessControl is Ownable {
    /** 
     @param role Admin right to be granted
     @param account acoount given admin right
    */
    event GrantRoles(bytes32 indexed role, address indexed account);
    event RemoveRoles(bytes32 indexed role, address indexed account);

    mapping(bytes32 => mapping(address => bool)) public roles;

    /// @dev Generates an hash for the ADMIN
    //0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42
    bytes32 public constant ADMIN = keccak256("ADMIN");

    /// @dev allows execution by the owner only
    modifier onlyRole(bytes32 _role) {
        require(roles[_role][msg.sender], "not authorized");
        _;
    }

    /// @notice admin rights are given to the deployer address
    constructor() {
        _grantRole(ADMIN, msg.sender);
    }

    /// @notice Internal function for granting roles
    function _grantRole(bytes32 _role, address _account) internal {
        roles[_role][_account] = true; // grant role to the inputed address
        emit GrantRoles(_role, _account);
    }

    /**
     *  @dev Granting an address certain rights.
     *  @param _account  address to be granted _role rights.
     *  @param _role hash for role/right name.
     */
    function grantRole(bytes32 _role, address _account) external onlyOwner {
        _grantRole(_role, _account);
    }

    /// @dev verify if an address has admin rights
    function isAdmin(address _address) public view returns (bool) {
        return roles[ADMIN][_address];
    }

    /** 
        @dev allows removal of ADMIN 
        can only be called by the contract owner

        @param _account   new ADMIN 
        @param _role hash for ADMIN
*/
    function removeRole(bytes32 _role, address _account) external onlyOwner {
        roles[_role][_account] = false; // remove role to the inputed address
        emit RemoveRoles(_role, _account);
    }
}
