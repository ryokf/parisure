// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

library PoolLib {
    struct Policy {
        string name;
        uint256 duration;
        uint256 price;
        bool isActive;
    }

    struct Member {
        bool isActive;
        uint256 joinedAt;
        uint256 expiredDate;
        uint256 policyId;
    }

    enum statusClaims {
        Pending,
        Accept,
        Reject
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
}
