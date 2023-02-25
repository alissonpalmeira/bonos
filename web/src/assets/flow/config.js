import { config } from "@onflow/fcl";

config({
    "app.detail.title": "Bonos",
    "app.detail.icon": process.env.REACT_APP_LOGO_URL,
    "accessNode.api": "https://rest-testnet.onflow.org", // Mainnet: "https://rest-mainnet.onflow.org"
    "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Mainnet: "https://fcl-discovery.onflow.org/authn"
    "0xBonos": "0x9ae006f4fcb04a9a",
})
