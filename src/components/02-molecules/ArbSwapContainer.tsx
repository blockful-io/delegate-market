import { ThemeContext } from "@/contexts/theme-config";
import { handleTokenAmountApproval } from "@/lib/blockchain/transactions";
import React, { useContext, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { toast } from "react-hot-toast";

const MIN_TOKEN_AMOUNT = 1;

enum ArbSwappingPanels {
  "staking",
  "unstaking",
}

export const ArbSwapContainer = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [activePanel, setActivePanel] = useState<ArbSwappingPanels>(
    ArbSwappingPanels.staking
  );
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex flex-col justify-center items-start font-semibold">
      <h2
        className="mb-5 text-3xl md:text-[40px]"
        style={{ color: theme.secondaryColor }}
      >
        Wrap ARB for rewards
      </h2>
      <p
        className="text-base mb-10"
        style={{ color: theme.secondaryColor, opacity: 0.6 }}
      >
        You can lock your ARB to get wrapped ARB (WARB) in return.
        <br /> WARB can be used to add liquidity or swap on Uniswap or Pancake,
        while allowing the ARB tokens to be actively used as delegation.
        <br /> ARB delegation is sold from time to time, and it&apos;s accruing
        revenue is split between liquidity providers of WARB pools.{" "}
      </p>
      <ul
        className="flex mb-4 rounded-md"
        style={{
          backgroundColor: theme.secondaryColor,
        }}
      >
        <li>
          <button
            style={{
              color:
                activePanel === ArbSwappingPanels.staking
                  ? theme.mainColor
                  : theme.tertiaryColor,
              padding: "8px 16px",
            }}
            onClick={() => setActivePanel(ArbSwappingPanels.staking)}
          >
            Stake
          </button>
        </li>
        <li>
          <button
            style={{
              color:
                activePanel === ArbSwappingPanels.unstaking
                  ? theme.mainColor
                  : theme.tertiaryColor,
              padding: "8px 16px",
            }}
            onClick={() => setActivePanel(ArbSwappingPanels.unstaking)}
          >
            Unstake
          </button>
        </li>
      </ul>
      <div
        style={{
          display: activePanel === ArbSwappingPanels.staking ? "block" : "none",
        }}
      >
        <ArbStaking />
      </div>
      <div
        style={{
          display:
            activePanel === ArbSwappingPanels.unstaking ? "block" : "none",
        }}
      >
        <ArbUnstaking />
      </div>
      {children}
    </div>
  );
};

const ArbUnstaking = () => {
  const { theme } = useContext(ThemeContext);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [arbUnstakingAmount, setArbUnstakingAmount] = useState(0);

  const onCTAHover = ({ hovering }: { hovering: boolean }) => {
    setIsCtaHovered(hovering);
  };

  const ctaConfig = {
    ...theme,
    background: isCtaHovered ? theme.mainColor : theme.secondaryColor,
    color: isCtaHovered ? theme.secondaryColor : theme.mainColor,
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col space-y-3"
    >
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
        <input
          step="0.01"
          min={MIN_TOKEN_AMOUNT}
          placeholder={`${MIN_TOKEN_AMOUNT} WARB or more`}
          style={{
            backgroundColor: theme.mainColor,
            color: theme.secondaryColor,
            padding: "6px 12px",
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 22,
          }}
          onChange={(e) => setArbUnstakingAmount(Number(e.target.value))}
          name="arbUnstakingAmount"
          id="arbUnstakingAmount"
          type="number"
        />
        <button
          className="transition"
          onMouseEnter={() => onCTAHover({ hovering: true })}
          onMouseLeave={() => onCTAHover({ hovering: false })}
          type="submit"
          style={{
            background: ctaConfig.background,
            color: ctaConfig.color,
            padding: "6px 12px",
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 17,
          }}
        >
          Unstake ARB
        </button>
      </div>
      <div className="flex flex-col space-y-1 flex-wrap">
        <label
          style={{
            color: theme.secondaryColor,
            opacity: 0.6,
            fontSize: 16,
            fontWeight: 700,
          }}
          htmlFor="arbUnstakingAmount"
        >
          Resulting ARB
        </label>
        <p
          style={{
            color: theme.secondaryColor,
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {arbUnstakingAmount} WARB : {arbUnstakingAmount} ARB
        </p>
      </div>
    </form>
  );
};

const ArbStaking = () => {
  const { address } = useAccount();
  const { theme } = useContext(ThemeContext);
  const { data: walletClient } = useWalletClient();
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [arbStakingAmount, setArbStakingAmount] = useState(0);

  const onCTAHover = ({ hovering }: { hovering: boolean }) => {
    setIsCtaHovered(hovering);
  };

  const ctaConfig = {
    ...theme,
    background: isCtaHovered ? theme.mainColor : theme.secondaryColor,
    color: isCtaHovered ? theme.secondaryColor : theme.mainColor,
  };

  const stakeArb = async () => {
    if (!address) {
      toast.error("User is not connected");
      return;
    }

    if (!walletClient) {
      toast.error("Wallet client is not ready to do transactions");
      return;
    }

    if (arbStakingAmount < MIN_TOKEN_AMOUNT) {
      toast.error("Amount must be greater");
      return;
    }

    const response = await handleTokenAmountApproval(
      arbStakingAmount,
      address,
      walletClient
    );

    if (response.isApproved) {
      toast.success(
        "Coming soon: ARB staking, unstaking, ARB delegation buying... We want to invite you to something: let's build the next step together? 🌱"
      );
      return;
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col space-y-3"
    >
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
        <input
          step="0.01"
          min={MIN_TOKEN_AMOUNT}
          placeholder={`${MIN_TOKEN_AMOUNT} ARB or more`}
          style={{
            backgroundColor: theme.mainColor,
            color: theme.secondaryColor,
            padding: "6px 12px",
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 22,
          }}
          onChange={(e) => {
            setArbStakingAmount(Number(e.target.value));
          }}
          name="arbStakingAmount"
          id="arbStakingAmount"
          type="number"
        />
        <button
          onClick={stakeArb}
          className="transition"
          onMouseEnter={() => onCTAHover({ hovering: true })}
          onMouseLeave={() => onCTAHover({ hovering: false })}
          type="submit"
          style={{
            background: ctaConfig.background,
            color: ctaConfig.color,
            padding: "6px 12px",
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 17,
          }}
        >
          Stake ARB
        </button>
      </div>
      <div className="flex flex-col space-y-1 flex-wrap">
        <label
          style={{
            color: theme.secondaryColor,
            opacity: 0.6,
            fontSize: 16,
            fontWeight: 700,
          }}
          htmlFor="arbStakingAmount"
        >
          Resulting WARB
        </label>
        <p
          style={{
            color: theme.secondaryColor,
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {arbStakingAmount} ARB : {arbStakingAmount} WARB
        </p>
      </div>
    </form>
  );
};
