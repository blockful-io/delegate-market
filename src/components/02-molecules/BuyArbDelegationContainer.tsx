import { ThemeContext } from "@/contexts/theme-config";
import { useContext, useState } from "react";

export const BuyArbDelegationContainer = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { theme } = useContext(ThemeContext);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

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
    <div className="flex flex-col justify-center items-start font-semibold pb-16">
      <h2
        className="mb-4 text-3xl md:text-[40px]"
        style={{ color: theme.secondaryColor }}
      >
        Buy ARB delegation
      </h2>
      <div
        className="w-full mt-4 lg:max-w-[509px] h-[279px] mb-[27px]"
        style={{ backgroundColor: theme.secondaryColor, borderRadius: 18 }}
      ></div>
      <p
        style={{
          color: theme.secondaryColor,
          opacity: 0.6,
          fontWeight: 500,
          fontSize: 15,
        }}
      >
        This is a Dutch Auction, meaning the first bid wins and the cost to bid
        goes down until it reaches the Minimum Value.
        <br />
        <br /> The previous holder of delegation has 24h to cover the offer and
        keep the delegation to their address, by paying the same price as the
        winner bid.
      </p>
    </div>
  );
};
