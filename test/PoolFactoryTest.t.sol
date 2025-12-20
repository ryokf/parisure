// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.30;

import {Test} from "forge-std/Test.sol";
import {PoolFactory} from "../src/PoolFactory.sol";

contract PoolFactoryTest is Test {
    PoolFactory public pool;

    function setUp() public {
        pool = new PoolFactory();
    }

    function testCreatePool() public {
        address poolAddressFromCreate = pool.createPool("test", 2, 7, 100);

        PoolFactory.PoolInfo memory poolInfoFromGet = pool.getPoolDetail(0);

        assertEq(poolAddressFromCreate, poolInfoFromGet.poolAddress);
        assertEq(poolInfoFromGet.owner, address(this));
        assertEq(poolInfoFromGet.name, "test");
    }
}
