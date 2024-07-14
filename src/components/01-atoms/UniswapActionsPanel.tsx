/* eslint-disable @next/next/no-img-element */
import { ThemeContext } from "@/contexts/theme-config";
import { useContext, useState } from "react";
import cc from "classcat";

export const UniswapSwapActionsPanel = () => {
  const { theme } = useContext(ThemeContext);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const ctaConfig = {
    background:
      isCtaHovered || isPanelVisible ? theme.secondaryColor : theme.mainColor,
    ...theme,
  };

  const onCTAHover = ({ hovering }: { hovering: boolean }) => {
    setIsCtaHovered(hovering);
  };

  const togglePanelVisibility = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  return (
    <nav className="relative">
      <button
        onClick={togglePanelVisibility}
        className="w-[140px] transition"
        style={{
          backgroundColor: ctaConfig.background,
          borderRadius: 6,
          padding: 10,
        }}
        onMouseEnter={() => onCTAHover({ hovering: true })}
        onMouseLeave={() => onCTAHover({ hovering: false })}
      >
        <img alt="Uniswap Swap Icon" src="/Uniswap.png" />
      </button>
      <div
        className={cc([
          "absolute left-0 top-full py-2",
          {
            "!hidden": !isPanelVisible,
          },
        ])}
        style={{
          backgroundColor: theme.mainColor,
          borderRadius: 6,
        }}
      >
        <button
          style={{ color: theme.secondaryColor, padding: "10px 12px" }}
          className="hover:underline"
        >
          Swap WARB
        </button>
        <button
          style={{ color: theme.secondaryColor, padding: "10px 12px" }}
          className="hover:underline"
        >
          Add Liquidity
        </button>
      </div>
    </nav>
  );
};
