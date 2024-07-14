import { ThemeContext } from "@/contexts/theme-config";
import { useContext, useState } from "react";

export const BuyArbDelegationContainer = () => {
  const { theme } = useContext(ThemeContext);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  const onCTAHover = ({ hovering }: { hovering: boolean }) => {
    setIsCtaHovered(hovering);
  };

  const ctaConfig = {
    ...theme,
    opacity: isCtaHovered ? 0.6 : 1,
    background: isCtaHovered
      ? theme.hoveredButtonBackground
      : theme.buttonBackground,
    color: isCtaHovered ? theme.secondaryColor : theme.mainColor,
  };

  const arbTotalSupplyInContract = 123456;
  const delegationPrice = 0.1;

  return (
    <div className="flex flex-col justify-center items-start font-semibold pb-16">
      <h2
        className="mb-4 text-3xl md:text-[40px]"
        style={{ color: theme.secondaryColor }}
      >
        Buy ARB delegation
      </h2>
      <div
        className="w-full mt-4 lg:max-w-[509px] h-[279px] mb-[27px] p-4"
        style={{ backgroundColor: theme.mainColor, borderRadius: 18 }}
      >
        <h3 className="flex flex-col">
          <p
            style={{
              color: theme.secondaryColor,
              fontWeight: 700,
              opacity: 0.6,
            }}
          >
            Available for delegation
          </p>
          <div
            className="flex space-x-1"
            style={{ color: theme.secondaryColor, fontSize: 40 }}
          >
            <strong>{arbTotalSupplyInContract.toLocaleString()}</strong>
            <p>ARB</p>
          </div>
        </h3>
        <h4 className="flex flex-col">
          <p
            style={{
              color: theme.secondaryColor,
              fontWeight: 700,
              opacity: 0.6,
            }}
          >
            Delegation price
          </p>
          <div
            className="flex space-x-1"
            style={{ color: theme.secondaryColor, fontSize: 40 }}
          >
            <strong>{delegationPrice.toLocaleString()}</strong>
            <p>ARB</p>
          </div>
        </h4>
        <button
          onMouseEnter={() => onCTAHover({ hovering: true })}
          onMouseLeave={() => onCTAHover({ hovering: false })}
          className="transition mt-5 w-full"
          style={{
            backgroundColor: ctaConfig.background,
            color: ctaConfig.color,
            fontSize: 24,
            borderRadius: 8,
            padding: "8px 20px",
          }}
        >
          Buy
        </button>
      </div>
      <p
        style={{
          color: theme.secondaryColor,
          opacity: 0.6,
          fontWeight: 500,
          fontSize: 15,
        }}
      >
        All revenue from delegation sales goes to the hook contracts attached to
        WARB/WETH pools on Uniswap and PancakeSwap to be split between liquidity
        providers at the time of liquidity removal.
      </p>
    </div>
  );
};
