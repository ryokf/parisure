// SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;

import {Script} from "forge-std/Script.sol";
import {PoolFactory} from "../src/PoolFactory.sol";

contract DeployParisure is Script {
    function run() public returns (PoolFactory) {
        // uint256 deployer = vm.envOr(
        //     "PRIVATE_KEY_ANVIL",
        //     uint256(
        //         0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
        //     )
        // );

        vm.startBroadcast();

        PoolFactory poolFactory = new PoolFactory();

        vm.stopBroadcast();

        return poolFactory;
    }
}
