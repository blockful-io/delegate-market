import { useContext } from "react";
import { NextPage } from "next";
import { ThemeContext } from "@/contexts/theme-config";
import {
  BuyArbDelegationContainer,
  PancakeSwapActionsPanel,
  TheFooter,
  TheHeader,
  UniswapSwapActionsPanel,
  ArbSwapContainer,
} from "@/components";

const IndexPage: NextPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      style={{
        background: theme.tertiaryColor,
      }}
    >
      <TheHeader />
      <main className="mt-[160px] relative mx-auto w-full max-w-[300px] md:max-w-[768px] lg:max-w-[1280px] lg:space-x-[5%] flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-16 lg:mb-0 lg:max-w-[45%]">
          <ArbSwapContainer>
            <div className="flex space-x-6 mt-6">
              <PancakeSwapActionsPanel />
              <UniswapSwapActionsPanel />
            </div>
          </ArbSwapContainer>
        </div>

        {/* Visual Screen Dividers */}
        <div
          className="hidden lg:block h-[522px] w-0.5"
          style={{ backgroundColor: theme.secondaryColor }}
        ></div>
        <div
          className="block lg:hidden w-full h-0.5"
          style={{ backgroundColor: theme.secondaryColor }}
        ></div>
        {/* Visual Screen Dividers */}

        <div className="mt-16 lg:mt-0 lg:max-w-[45%]">
          <BuyArbDelegationContainer />
        </div>
      </main>
      <TheFooter />
    </div>
  );
};

export default IndexPage;
