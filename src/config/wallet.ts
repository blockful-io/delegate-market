import { arbitrum } from "wagmi/chains";
import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { createWalletClient } from "viem";

export enum SupportedNetworks {
  "Arbitrum" = 42161,
}

export const ENV_DEFAULT_CHAIN_ID = SupportedNetworks.Arbitrum;

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

if (!alchemyApiKey) {
  throw new Error("Please provide an Alchemy API key");
}

const rpcHttpUrl = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

if (!rpcHttpUrl) {
  throw new Error("Please provide an Alchemy API RPC HTTP URL");
}

const projectID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "";

if (!projectID) {
  throw new Error("Please provide an Wallet Connect project ID");
}

const { chains, publicClient } = configureChains(
  [arbitrum],
  [alchemyProvider({ apiKey: alchemyApiKey }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Blockful Frontend Web3 Boilerplate",
  projectId: projectID,
  chains,
});

const wagmiClientConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains, wagmiClientConfig, publicClient };
