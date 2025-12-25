import { defineConfig } from "@wagmi/cli";
import { foundry } from "@wagmi/cli/plugins";

export default defineConfig({
    out: "constant/abi.ts",
    contracts: [],
    plugins: [
        foundry({
            project: "../",
            include: [
                "PoolFactory.json",
                "ParisurePool.json"
            ]
        })
    ]
})