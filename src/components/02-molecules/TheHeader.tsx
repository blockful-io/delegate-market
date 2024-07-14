import { useContext } from "react";
import { ConnectWallet, LightModeToggle } from "../01-atoms";
import { ThemeContext } from "@/contexts/theme-config";

export const TheHeader = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <header
      className="z-50 flex flex-col items-start space-y-4 md:space-x-0 md:flex-row md:justify-between md:items-center p-4 pr-8 fixed top-0 left-0 w-screen"
      style={{ backgroundColor: theme.mainColor }}
    >
      <div className="flex space-x-4 items-center">
        <div className="mt-2">
          <LightModeToggle />
        </div>
        <h1
          className="text-3xl font-bold"
          style={{ color: theme.primaryTextColor }}
        >
          DelegateMarket
        </h1>
      </div>
      <ConnectWallet />
    </header>
  );
};
