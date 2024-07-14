import { SupportedNetworks } from "@/config/wallet";

enum Contracts {
  "MyContractName",
}

export const ContractAddressByChain: Record<
  SupportedNetworks,
  Record<Contracts, string>
> = {
  [SupportedNetworks.Arbitrum]: {
    [Contracts.MyContractName]: "0x000",
  },
};
