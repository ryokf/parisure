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

    uint256 public s_policyCount = 0;
    mapping(uint256 idPolicy => PoolLib.Policy) private s_policyList;

    mapping(uint256 id => address memberAddress) private s_memberId;
    mapping(address => PoolLib.Member) public s_members;

    PoolLib.Claim[] public s_claims;

    mapping(uint256 id => mapping(address member => bool hasVoted))
        public s_voters;

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

    function getPolicyDetail(
        uint256 _policyId
    ) public view returns (PoolLib.Policy memory) {
        return s_policyList[_policyId];
    }

    function memberJoin(
        address memberAddress,
        uint256 joinedAt,
        uint256 expiredDate,
        uint256 policyId
    ) public {
        s_members[memberAddress] = PoolLib.Member(
            true,
            joinedAt,
            expiredDate,
            policyId
        );
    }

    function getMember(
        uint256 _id
    ) public view returns (PoolLib.Member memory) {
        address memberAddress = s_memberId[_id];

        PoolLib.Member memory memberDetail = s_members[memberAddress];

        return memberDetail;
    }
}
