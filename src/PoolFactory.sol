// SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;
import {ParisurePool} from "./ParisurePool.sol";

contract PoolFactory {
    struct PoolInfo {
        address poolAddress;
        address owner;
        string name;
    }
    PoolInfo[] public poolList;

    function createPool(
        string memory _name,
        uint256 _ownerFee,
        uint256 _waitingPeriod,
        uint256 _maxCoverageAmount
    ) public returns (address) {
        ParisurePool newPool = new ParisurePool(
            _name,
            _ownerFee,
            _waitingPeriod,
            _maxCoverageAmount,
            msg.sender
        );

        poolList.push(PoolInfo(address(newPool), msg.sender, _name));

        return address(newPool);
    }

    function getPoolDetail(
        uint256 _poolId
    ) public view returns (PoolInfo memory) {
        return poolList[_poolId];
    }
}
