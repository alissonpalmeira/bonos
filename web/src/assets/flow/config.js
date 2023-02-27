import { config } from "@onflow/fcl";

config({
    "app.detail.title": "Bonos",
    "app.detail.icon": process.env.REACT_APP_LOGO_URL,
    "accessNode.api": process.env.REACT_APP_ACCESS_NODE_API,
    "discovery.wallet": process.env.REACT_APP_DISCOVERY_WALLET,
    "0xBonos": process.env.REACT_APP_BONOS_ACCOUNT,
})
