// import { Abi, Hash, TransactionReceipt } from "viem";
// import { walletClient, publicClient } from "../../config/wallet";
// import { toast } from "react-hot-toast"

// const handleTokenAmountApproval = async (
//   token: any,
//   chainId: number,
//   authedAddress: `0x${string}`
// ) => {
//   if (!chainId) {
//     throw new Error("User is not connected to any network");
//   }
//   if (!authedAddress) {
//     throw new Error("User is not connected");
//   }

//   try {
//     const approved = await checkTokenAmountApproval(token, chainId, authedAddress);

//     if (approved) {
//       return {
//         approved: true,
//       };
//     } else {
//       await askTokenAmountApproval(token).then((isApproved) => {
//         if (typeof isApproved !== "undefined") {
//           return {
//             approved: true,
//           };
//         } else {
//           return {
//             approved: false,
//           };
//         }
//       });
//     }
//   } catch {
//     return {
//       approved: false,
//     };
//   }
// };

// const checkTokenAmountApproval = async (
//   token: any,
//   chainId: number,
//   authedAddress: `0x${string}`
// ) => {
//   if (!chainId) {
//     throw new Error("User is not connected to any network");
//   }
//   if (!authedAddress) {
//     throw new Error("User is not connected");
//   }

//   try {
//     //const data = await publicClient({ chainId }).readContract({
//     //abi: someAbi,
//     //     functionName: "getApproved",
//     //     address: authedAddress,
//     //     args: [],
//     //   });

//     //   return data == "something";
//     return true;
//   } catch (e) {
//     console.error(e);
//     return false;
//   }
// };

// const askTokenAmountApproval = async (
//   token: any,
//   chainId: number,
//   authedAddress: `0x${string}`
// ): Promise<TransactionReceipt | undefined> => {
//   if (!chainId) {
//     throw new Error("User is not connected to any network");
//   }
//   if (!authedAddress) {
//     throw new Error("User is not connected");
//   }

//         let txReceipt = {} as TransactionReceipt;

//   try {
//       const abi = SomeABI as Abi;
//       const functionName = "approve";

//       try {
//         const { request } = await publicClient({ chainId }).simulateContract({
//           account: authedAddress,
//           address: contractAddress,
//           args: [],
//           functionName,
//           abi,
//         });

//         const transactionHash: Hash = await walletClient.writeContract(request);

//         while (typeof txReceipt.blockHash === "undefined") {
//           /*
//             It is guaranteed that at some point we'll have a valid TransactionReceipt in here.
//             If we had a valid transaction sent (which is confirmed at this point by the try/catch block),
//             it is a matter of waiting the transaction to be mined in order to know whether it was successful or not.

//             So why are we using a while loop here?
//             - Because it is possible that the transaction was not yet mined by the time
//             we reach this point. So we keep waiting until we have a valid TransactionReceipt.
//           */

//           const transactionReceipt = await publicClient({
//             chainId,
//           }).waitForTransactionReceipt({
//             hash: transactionHash,
//           });

//           if (transactionReceipt) {
//             txReceipt = transactionReceipt;
//           }
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     } catch (error) {
//       console.error(error);
//     }

//     if (txReceipt.success) {
//       console.log("Token amount was approved");

//       return txReceipt;
//     } else {
//         console.error("Token amount was not approved");
//     }
//   } catch (error) {
//     toastTxError(String(error));
//     console.error(error);
//   }
// };

// const toastTxError = (e: string) => {
//   if (e.includes("rejected") || e.includes("declined")) {
//     toast.error("Transaction rejected");
//   } else {
//     toast.error("Transaction failed. Please contact our team.");
//   }
// };
