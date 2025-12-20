// SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;

import {PoolLib} from "./library/poolLib.sol";

contract ParisurePool {
    string public s_name;
    address public immutable i_owner;
    uint256 public s_maxCoverageAmount;
    uint256 public s_ownerFee;
    uint256 public s_ownerBalance;
    uint256 public s_waitingPeriod;
    constructor(
        string memory name,
        uint256 ownerFee,
        uint256 waitingPeriod,
        uint256 maxCoverageAmount,
        address owner
    ) {
        s_name = name;
        s_maxCoverageAmount = maxCoverageAmount;
        s_ownerFee = ownerFee;
        s_waitingPeriod = waitingPeriod;
        i_owner = owner;
    }

    uint256 private s_policyCount = 0;
    mapping(uint256 idPolicy => PoolLib.Policy) s_policyList;

    mapping(address => PoolLib.Member) private s_members;

    PoolLib.Claim[] private s_claims;

    mapping(uint256 id => mapping(address member => bool hasVoted))
        private s_voters;

    function createPolicy(
        string memory _name,
        uint256 _duration,
        uint256 _price,
        bool _isActive
    ) public {
        s_policyList[s_policyCount] = PoolLib.Policy(
            _name,
            _duration,
            _price,
            _isActive = true
        );
        s_policyCount++;
    }

    function getPolicy(
        uint256 _policyId
    ) public view returns (PoolLib.Policy memory) {
        return s_policyList[_policyId];
    }
}
