import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { sepolia } from "viem/chains"

const projectId = ""

const config = getDefaultConfig({
    appName: "Parisure",
    projectId: projectId,
    chains: [sepolia],
    ssr: true
})

export default config