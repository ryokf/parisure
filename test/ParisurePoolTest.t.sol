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
        pool.createPolicy("perlindungan kilat", 1, 1 wei, true);
    }
}
