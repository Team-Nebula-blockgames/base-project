// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract AccessControl {
    event GrantRoles(bytes32 indexed role, address indexed account);
    event RemoveRoles(bytes32 indexed role, address indexed account);

    mapping(bytes32 => mapping(address => bool)) public roles;

    // hash for admin
    //0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42
    bytes32 public constant ADMIN = keccak256("ADMIN");

    // hash for user
    //0x2db9fd3d099848027c2383d0a083396f6c41510d7acfd92adc99b6cffcf31e96
    bytes32 public constant USER = keccak256("USER");

    modifier onlyRole(bytes32 _role) {
        require(roles[_role][msg.sender], "not authorized");
        _;
    }

    constructor() {
        _grantRole(ADMIN, msg.sender);
    }

    function _grantRole(bytes32 _role, address _account) internal {
        roles[_role][_account] = true; // grant role to the inputed address
        emit GrantRoles(_role, _account);
    }

    function grantRole(bytes32 _role, address _account)
        external
        onlyRole(ADMIN)
    {
        _grantRole(_role, _account);
    }

    function removeRole(bytes32 _role, address _account)
        external
        onlyRole(ADMIN)
    {
        roles[_role][_account] = false; // remove role to the inputed address
        emit RemoveRoles(_role, _account);
    }
}
