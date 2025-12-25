'use client'

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { foundry, sepolia } from "viem/chains"

const projectId = "rhs1wvvxx74p5llz"

const config = getDefaultConfig({
    appName: "Parisure",
    projectId: projectId,
    chains: [foundry, sepolia],
    ssr: true
})

export default config