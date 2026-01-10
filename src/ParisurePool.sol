// SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;

import {PoolLib} from "./library/poolLib.sol";

contract ParisurePool {
    event MemberJoined(
        address emberAddress,
        uint256 policyId,
        uint256 timestamp
    );
    event ClaimSubmitted(address claimant, uint256 claimId, string photoUrl);
    event Voted(address voter, uint256 claimId, bool vote);
    event ClaimExecuted(
        uint256 claimId,
        PoolLib.statusClaims status,
        uint256 value
    );

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

    mapping(uint256 claimId => mapping(address member => bool hasVoted))
        public s_voters;

    function getPoolDetail()
        public
        view
        returns (string memory, uint256, uint256, address)
    {
        return (s_name, s_waitingPeriod, s_maxCoverageAmount, i_owner);
    }

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

    function memberJoinPool(uint256 _policyId) public payable {
        // cek apakah polis ada
        require(_policyId < s_policyList.length, "Policy Not Found");
        PoolLib.Policy memory policy = getPolicyDetail(_policyId);

        // cek apakah polis aktif
        require(policy.isActive, "Policy is not active");

        // cek harga polis
        require(msg.value == policy.price, "Make sure you input right value");

        s_members[msg.sender] = PoolLib.Member(
            true,
            block.timestamp,
            block.timestamp + policy.duration,
            _policyId
        );

        if (s_members[msg.sender].joinedAt == 0) {
            s_memberId.push(msg.sender);
        }

        emit MemberJoined(msg.sender, _policyId, block.timestamp);
    }

    function getMemberCount() public view returns (uint256) {
        return s_memberId.length;
    }

    function getMember(
        uint256 _id
    ) public view returns (PoolLib.Member memory) {
        address memberAddress = s_memberId[_id];

        PoolLib.Member memory memberDetail = s_members[memberAddress];

        return memberDetail;
    }

    function submitClaim(
        string memory _evidenceUrl,
        string memory _description
    ) public {
        PoolLib.Member memory member = s_members[msg.sender];
        require(member.isActive, "Your status is not active");

        // PoolLib.Policy memory policy = s_policyList[member.policyId];
        require(member.expiredDate > block.timestamp);

        uint256 claimCount = s_claims.length;

        PoolLib.Claim memory claim = PoolLib.Claim(
            claimCount,
            msg.sender,
            _evidenceUrl,
            _description,
            0,
            0,
            PoolLib.statusClaims.Pending
        );

        s_claims.push(claim);

        emit ClaimSubmitted(msg.sender, claimCount, _evidenceUrl);
    }

    function voteClaim(uint256 _claimId, bool vote) public {
        PoolLib.Member memory member = s_members[msg.sender];

        require(member.isActive, "Your account is not active");

        bool voters = s_voters[_claimId][msg.sender];

        require(!voters, "You has been voted");

        PoolLib.Claim storage claim = s_claims[_claimId];

        require(
            claim.status == PoolLib.statusClaims.Pending,
            "this claim was done"
        );

        require(
            claim.claimant != msg.sender,
            "you not allowed to vote your own claim"
        );

        if (vote) {
            claim.voteYes++;
        } else {
            claim.voteNo++;
        }

        s_voters[_claimId][msg.sender] = true;

        uint256 totalVote = claim.voteYes + claim.voteNo;

        if (totalVote >= s_memberId.length / 2) {
            if (claim.voteYes > claim.voteNo) {
                claim.status = PoolLib.statusClaims.Accept;
                _executeClaim(_claimId);
            } else {
                claim.status = PoolLib.statusClaims.Reject;
            }
        }

        emit Voted(msg.sender, _claimId, vote);
    }

    function _executeClaim(uint256 _claimId) private {
        PoolLib.Claim storage claim = s_claims[_claimId];

        require(
            claim.status == PoolLib.statusClaims.Accept,
            "rejected claim can't executed"
        );

        uint256 payout = address(this).balance > s_maxCoverageAmount
            ? s_maxCoverageAmount
            : address(this).balance;

        (bool sendSuccess, ) = payable(claim.claimant).call{value: payout}("");
        if (!sendSuccess) {
            revert();
        }

        emit ClaimExecuted(_claimId, claim.status, payout);
    }
}
