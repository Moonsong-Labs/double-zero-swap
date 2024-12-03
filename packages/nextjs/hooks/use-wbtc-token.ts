import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { CPAMM_ADDRESS } from "~~/contracts/cpamm";
import { ERC20_ABI, WBTC_TOKEN } from "~~/contracts/tokens";

export default function useWbtcToken() {
  const { address } = useAccount();
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: WBTC_TOKEN.address,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address ?? ""],
  });
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: WBTC_TOKEN.address,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [address ?? "", CPAMM_ADDRESS],
  });
  const { writeContractAsync } = useWriteContract();

  const approve = (amount: bigint) =>
    writeContractAsync({
      abi: ERC20_ABI,
      address: WBTC_TOKEN.address,
      functionName: "approve",
      args: [CPAMM_ADDRESS, amount],
    });

  const refetchAll = () => {
    refetchBalance();
    refetchAllowance();
  };

  return { balance, allowance, refetchBalance, refetchAllowance, approve, refetchAll };
}
