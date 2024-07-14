import { ThemeContext } from "@/contexts/theme-config";
import Link from "next/link";
import { useContext } from "react";

const socialMedias = [
  {
    label: "Blockful.io",
    url: "https://blockful.io/",
  },
  {
    label: "Github",
    url: "https://github.com/blockful-io/",
  },
];

const contracts = [
  {
    label: "Contract",
    url: "https://arbiscan.io/address/0x39e0440071F3dE532597c7cFecba71f561b70375#code",
  },
];

export const TheFooter = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className="flex flex-col space-y-4 justify-center items-center p-4 mt-6">
      <ul
        className="flex space-x-0 flex-wrap flex-col space-y-3 text-center lg:space-x-6 lg:space-y-0 lg:flex-row"
        style={{ color: theme.primaryTextColor, fontWeight: 700 }}
      >
        {socialMedias.map((socialMedia) => (
          <li key={socialMedia.label} className="underline">
            <Link href={socialMedia.url}>{socialMedia.label}</Link>
          </li>
        ))}
        {contracts.map((contract) => (
          <li key={contract.label} className="underline">
            <Link href={contract.url}>{contract.label}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};
