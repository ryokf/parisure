'use client'

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { sepolia } from "viem/chains"

const projectId = "rhs1wvvxx74p5llz"

const config = getDefaultConfig({
    appName: "Parisure",
    projectId: projectId,
    chains: [sepolia],
    ssr: true
})

export default config