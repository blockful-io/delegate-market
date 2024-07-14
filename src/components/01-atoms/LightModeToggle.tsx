import { ThemeContext } from "@/contexts/theme-config";
import { Theme } from "@/lib/client/theme";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";

export const LightModeToggle = () => {
  const { theme, updateActiveThemeConfiguration } = useContext(ThemeContext);

  return (
    <div>
      {theme.themeName === Theme.Light ? (
        <button
          onClick={() => updateActiveThemeConfiguration(Theme.Dark)}
          style={{ fill: theme.mainColor }}
        >
          <MoonIcon className="w-5 lg:w-8 hover:text-gray-300" />
        </button>
      ) : theme.themeName === Theme.Dark ? (
        <button onClick={() => updateActiveThemeConfiguration(Theme.Light)}>
          <SunIcon
            className="w-5 lg:w-8 hover:text-gray-300"
            style={{ fill: theme.secondaryColor }}
          />
        </button>
      ) : null}
    </div>
  );
};
