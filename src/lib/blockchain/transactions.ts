import { Hash, TransactionReceipt } from "viem";
import { publicClient, ENV_DEFAULT_CHAIN_ID } from "../../config/wallet";
import { toast } from "react-hot-toast";
import { erc20ABI, WalletClient } from "wagmi";
import {
  ARB_TOKEN_SC_ADDRESS,
  DELEGATE_MARKET_SC_ADDRESS,
} from "../client/constants";

interface TokenAmountApprovalRequest {
  isApproved: boolean;
  amount: number;
}

interface TokenAmountBlockchainApproval {
  blockchainTxError?: string;
  isApproved: boolean;
  amount: bigint;
}

const ARB_DECIMALS = 10 ** 18;

// This function is the only one that communicates to Ui
export const handleTokenAmountApproval = async (
  amountToApprove: number,
  authedAddress: `0x${string}`,
  walletClient: WalletClient
): Promise<TokenAmountApprovalRequest> => {
  if (!authedAddress) {
    toast.error("User is not connected");
    return { isApproved: false, amount: amountToApprove };
  }

  const tokenAmountWithDecimals = BigInt(amountToApprove * ARB_DECIMALS);

  try {
    const approved = await checkTokenAmountApproval(
      tokenAmountWithDecimals,
      authedAddress
    );
    if (approved?.blockchainTxError) {
      toastTxError(approved?.blockchainTxError);
      return {
        isApproved: approved.isApproved,
        amount: amountToApprove,
      };
    }

    if (approved.isApproved) {
      toast.success("Transaction successful");
      return {
        isApproved: approved.isApproved,
        amount: amountToApprove,
      };
    } else {
      const response = await askTokenAmountApproval(
        authedAddress,
        walletClient,
        tokenAmountWithDecimals
      );

      if (response.blockchainTxError) {
        toastTxError(response?.blockchainTxError);
      } else {
        toast.success("Transaction successful");
      }

      return {
        isApproved: response.isApproved,
        amount: amountToApprove,
      };
    }
  } catch (error) {
    toastTxError(error);
    return {
      isApproved: false,
      amount: amountToApprove,
    };
  }
};

const checkTokenAmountApproval = async (
  tokenAmount: bigint,
  authedAddress: `0x${string}`
) => {
  if (!authedAddress) {
    toast.error("User is not connected");
    return { isApproved: false, amount: tokenAmount };
  }

  try {
    const allowedAmount = await publicClient({
      chainId: ENV_DEFAULT_CHAIN_ID,
    }).readContract({
      abi: erc20ABI,
      address: ARB_TOKEN_SC_ADDRESS,
      functionName: "allowance",
      args: [authedAddress, DELEGATE_MARKET_SC_ADDRESS],
    });

    return {
      isApproved: tokenAmount <= allowedAmount,
      amount: tokenAmount,
    };
  } catch (error) {
    console.error(error);
    return {
      isApproved: false,
      amount: tokenAmount,
      blockchainTxError: String(error),
    };
  }
};

const askTokenAmountApproval = async (
  authedAddress: `0x${string}`,
  walletClient: WalletClient,
  tokenAmount: bigint
): Promise<TokenAmountBlockchainApproval> => {
  if (!authedAddress) {
    toast.error("User is not connected");
    return { isApproved: false, amount: tokenAmount };
  }

  let txReceipt = {} as TransactionReceipt;

  try {
    try {
      const { request } = await publicClient({
        chainId: ENV_DEFAULT_CHAIN_ID,
      }).simulateContract({
        abi: erc20ABI,
        account: authedAddress,
        functionName: "approve",
        address: ARB_TOKEN_SC_ADDRESS,
        args: [authedAddress, BigInt(tokenAmount)],
      });

      const transactionHash: Hash = await walletClient.writeContract(request);

      while (typeof txReceipt.blockHash === "undefined") {
        /*
          It is guaranteed that at some point we'll have a valid TransactionReceipt in here.
          If we had a valid transaction sent (which is confirmed at this point by the try/catch block),
          it is a matter of waiting the transaction to be mined in order to know whether it was successful or not.

          So why are we using a while loop here?
          - Because it is possible that the transaction was not yet mined by the time
          we reach this point. So we keep waiting until we have a valid TransactionReceipt.
        */

        const transactionReceipt = await publicClient({
          chainId: ENV_DEFAULT_CHAIN_ID,
        }).waitForTransactionReceipt({
          hash: transactionHash,
        });

        if (transactionReceipt) {
          txReceipt = transactionReceipt;
        }
      }
    } catch (error) {
      console.error(error);
      return {
        isApproved: false,
        amount: tokenAmount,
        blockchainTxError: String(error),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      isApproved: false,
      amount: tokenAmount,
      blockchainTxError: String(error),
    };
  }

  if (txReceipt.status === "success") {
    console.log("Token amount was approved");
    return { isApproved: true, amount: tokenAmount };
  } else {
    console.error("Token amount was not approved");
    return { isApproved: false, amount: tokenAmount };
  }
};

const swapArbToWarb = async (
  authedAddress: `0x${string}`,
  walletClient: WalletClient,
  tokenAmount: bigint
): Promise<TokenAmountBlockchainApproval> => {
  if (!authedAddress) {
    toast.error("User is not connected");
    return { isApproved: false, amount: tokenAmount };
  }

  let txReceipt = {} as TransactionReceipt;

  try {
    try {
      const { request } = await publicClient({
        chainId: ENV_DEFAULT_CHAIN_ID,
      }).simulateContract({
        abi: erc20ABI,
        account: authedAddress,
        functionName: "approve",
        address: ARB_TOKEN_SC_ADDRESS,
        args: [authedAddress, BigInt(tokenAmount)],
      });

      const transactionHash: Hash = await walletClient.writeContract(request);

      while (typeof txReceipt.blockHash === "undefined") {
        /*
          It is guaranteed that at some point we'll have a valid TransactionReceipt in here.
          If we had a valid transaction sent (which is confirmed at this point by the try/catch block),
          it is a matter of waiting the transaction to be mined in order to know whether it was successful or not.

          So why are we using a while loop here?
          - Because it is possible that the transaction was not yet mined by the time
          we reach this point. So we keep waiting until we have a valid TransactionReceipt.
        */

        const transactionReceipt = await publicClient({
          chainId: ENV_DEFAULT_CHAIN_ID,
        }).waitForTransactionReceipt({
          hash: transactionHash,
        });

        if (transactionReceipt) {
          txReceipt = transactionReceipt;
        }
      }
    } catch (error) {
      console.error(error);
      return {
        isApproved: false,
        amount: tokenAmount,
        blockchainTxError: String(error),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      isApproved: false,
      amount: tokenAmount,
      blockchainTxError: String(error),
    };
  }

  if (txReceipt.status === "success") {
    console.log("Token amount was approved");
    return { isApproved: true, amount: tokenAmount };
  } else {
    console.error("Token amount was not approved");
    return { isApproved: false, amount: tokenAmount };
  }
};

const toastTxError = (e: unknown) => {
  if (
    String(e).includes("rejected") ||
    String(e).includes("declined") ||
    String(e).includes("denied")
  ) {
    toast.error("Please approve the transaction");
  } else {
    toast.error("Transaction failed. Please contact us!");
  }
};

export const getArbTotalSupply = async () => {
  const totalSupply = await publicClient({
    chainId: ENV_DEFAULT_CHAIN_ID,
  }).readContract({
    abi: erc20ABI,
    address: ARB_TOKEN_SC_ADDRESS,
    functionName: "totalSupply",
  });

  return totalSupply;
};
