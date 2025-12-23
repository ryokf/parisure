// SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;

import {PoolLib} from "./library/poolLib.sol";

contract ParisurePool {
    string public s_name;
    address public immutable i_owner;
    uint256 public s_maxCoverageAmount;
    uint256 public s_waitingPeriod;

    modifier onlyOwner() {
        require(msg.sender == i_owner, "Not owner");
        _;
    }

    constructor(
        string memory name,
        uint256 waitingPeriod,
        uint256 maxCoverageAmount,
        address owner
    ) {
        s_name = name;
        s_maxCoverageAmount = maxCoverageAmount;
        s_waitingPeriod = waitingPeriod;
        i_owner = owner;
    }

    PoolLib.Policy[] public s_policyList;

    address[] private s_memberId;
    mapping(address => PoolLib.Member) public s_members;

    PoolLib.Claim[] public s_claims;

    mapping(uint256 id => mapping(address member => bool hasVoted))
        public s_voters;

    function createPolicy(
        string memory _name,
        uint256 _duration,
        uint256 _price,
        bool _isActive
    ) public onlyOwner {
        s_policyList.push(PoolLib.Policy(_name, _duration, _price, _isActive));
    }

    function getPolicyDetail(
        uint256 _policyId
    ) public view returns (PoolLib.Policy memory) {
        return s_policyList[_policyId];
    }

    function getPolicyCount() public view returns (uint256) {
        return s_policyList.length;
    }

    function memberJoinPool(
        address _memberAddress,
        uint256 _policyId
    ) public payable {
        // cek apakah polis ada
        require(_policyId < s_policyList.length, "Policy Not Found");
        PoolLib.Policy memory policy = getPolicyDetail(_policyId);

        // cek apakah polis aktif
        require(policy.isActive, "Policy is not active");

        // cek harga polis
        require(msg.value == policy.price, "Make sure you input right value");

        s_members[_memberAddress] = PoolLib.Member(
            true,
            block.timestamp,
            block.timestamp + policy.duration,
            _policyId
        );

        s_memberId.push(msg.sender);
    }

    function getMember(
        uint256 _id
    ) public view returns (PoolLib.Member memory) {
        address memberAddress = s_memberId[_id];

        PoolLib.Member memory memberDetail = s_members[memberAddress];

        return memberDetail;
    }
}
