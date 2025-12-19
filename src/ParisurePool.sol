// SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;

contract ParisurePool {
    string private s_name;
    address private immutable i_owner;
    uint256 private s_maxCoverageAmount;
    uint256 private s_ownerFee;
    uint256 private s_ownerBalance;
    uint256 private s_waitingPeriod;
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

    struct Policy {
        string name;
        uint256 duration;
        uint256 price;
        bool isActive;
    }

    mapping(uint256 idPolicy => Policy) s_policyList;

    struct Member {
        bool isActive;
        uint256 joinedAt;
        uint256 expiredDate;
        uint256 policyId;
    }
    mapping(address => Member) private s_members;
    enum statusClaims {
        Accept,
        Reject,
        Pending
    }
    struct Claim {
        uint256 id;
        address claimant;
        string photoUrl;
        string description;
        uint256 voteYes;
        uint256 voteNo;
        statusClaims status;
    }

    Claim[] private s_claims;

    mapping(uint256 id => mapping(address member => bool hasVoted))
        private s_voters;
}
