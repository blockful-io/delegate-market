import { ThemeContext } from "@/contexts/theme-config";
import { useContext, useState } from "react";

const MIN_ARB_STAKING_AMOUNT = 100;

export const WrapArbContainer = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { theme } = useContext(ThemeContext);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [arbStakingAmount, setArbStakingAmount] = useState(0);

  const onCTAHover = ({ hovering }: { hovering: boolean }) => {
    setIsCtaHovered(hovering);
  };

  const ctaConfig = {
    ...theme,
    opacity: isCtaHovered ? 0.6 : 1,
    background: isCtaHovered ? theme.secondaryColor : theme.mainColor,
    color: isCtaHovered ? theme.mainColor : theme.secondaryColor,
  };

  return (
    <div className="flex flex-col justify-center items-start font-semibold">
      <h2
        className="mb-5 text-3xl md:text-[40px]"
        style={{ color: theme.secondaryColor }}
      >
        Wrap ARB for rewards
      </h2>
      <p
        className="text-lg mb-10"
        style={{ color: theme.secondaryColor, opacity: 0.6 }}
      >
        You can lock your ARB to get wrapped ARB (WARB) in return.
        <br />
        <br /> WARB can be used to add liquidity or swap on Uniswap or Pancake,
        while allowing the ARB tokens to be actively used as delegation.
        <br />
        <br /> Every 14 days the ARB delegation gets auctioned and the revenue
        gets split between liquidity providers on WARB pools.{" "}
      </p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col space-y-3"
      >
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
          <input
            min={MIN_ARB_STAKING_AMOUNT}
            placeholder={`${MIN_ARB_STAKING_AMOUNT} ARB or more`}
            style={{
              backgroundColor: theme.secondaryColor,
              color: theme.mainColor,
              padding: "6px 12px",
              borderRadius: 6,
              fontWeight: 700,
              fontSize: 22,
            }}
            onChange={(e) => setArbStakingAmount(Number(e.target.value))}
            name="arbStakingAmount"
            id="arbStakingAmount"
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
              opacity: ctaConfig.opacity,
              padding: "6px 12px",
              borderRadius: 6,
              fontWeight: 700,
              fontSize: 17,
            }}
          >
            Lock ARB
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
            {arbStakingAmount} WARB : {arbStakingAmount} ARB
          </p>
        </div>
      </form>
      {children}
    </div>
  );
};
