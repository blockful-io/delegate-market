import { ThemeContext } from "@/contexts/theme-config";
import Link from "next/link";
import { useContext } from "react";

const contracts = [
  {
    label: "Wrapped ARB",
    url: "",
  },
  {
    label: "Auction",
    url: "",
  },
  {
    label: "PancakeSwap Hook",
    url: "",
  },
  {
    label: "Uniswap Hook",
    url: "",
  },
];

export const TheFooter = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className="flex justify-center items-center p-4 my-6">
      <ul
        className="flex space-x-0 flex-wrap flex-col space-y-3 text-center lg:space-x-6 lg:space-y-0 lg:flex-row"
        style={{ color: theme.secondaryColor, fontWeight: 700 }}
      >
        <li>
          <p>Contracts:</p>
        </li>
        {contracts.map((contract) => (
          <li key={contract.label} className="underline">
            <Link href={contract.url}>{contract.label}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};
