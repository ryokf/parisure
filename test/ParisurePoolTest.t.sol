// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.30;

import {console, Test} from "forge-std/Test.sol";
import {ParisurePool} from "../src/ParisurePool.sol";
import {PoolLib} from "../src/library/poolLib.sol";

contract ParisurePoolTest is Test {
    ParisurePool public pool;

    function setUp() public {
        pool = new ParisurePool("test pool 1", 2, 7, 10, msg.sender);
    }

    function testDeployContract() public {
        console.log(address(pool));
    }

    function testCreatePolicy() public {
        vm.prank(address(this));
        pool.createPolicy("perlindungan kilat", 1, 10 gwei, true);

        PoolLib.Policy memory newPool = pool.getPolicyDetail(0);

        assertEq(newPool.name, "perlindungan kilat");
        assertEq(newPool.duration, 1);
        assertEq(newPool.price, 10 gwei);
        assertEq(newPool.isActive, true);
    }

    function testGetAllPolicy() public {
        pool.createPolicy("perlindungan kilat", 1, 10 gwei, true);
        pool.createPolicy("perlindungan aman", 7, 50 gwei, true);
        pool.createPolicy("perlindungan ekstra", 30, 250 gwei, true);

        uint256 policyCount = pool.getPolicyCount();

        for (uint256 i = 0; i < policyCount; i++) {
            PoolLib.Policy memory policy = pool.getPolicyDetail(i);
            console.log(policy.name);
            console.log(policy.duration);
            console.log(policy.price);
            console.log(policy.isActive);
        }
    }
}
