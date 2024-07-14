export enum Theme {
  "Light" = "light",
  "Dark" = "dark",
  "Loading" = "loading",
}
export const DEFAULT_THEME = Theme.Dark;
export const THEME_COOKIE_KEY = "swaplace_theme";

interface ThemeConfig {
  themeName: Theme;
  mainColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  buttonBackground: string;
  buttonTextColor: string;
  hoveredButtonBackground: string;
  hoveredButtonTextColor: string;
}

export const THEMES_CONFIGURATION: Record<Theme, ThemeConfig> = {
  [Theme.Loading]: {
    themeName: Theme.Loading,
    mainColor: "",
    secondaryColor: "",
    tertiaryColor: "",
    primaryTextColor: "",
    secondaryTextColor: "",
    buttonBackground: "",
    buttonTextColor: "",
    hoveredButtonBackground: "",
    hoveredButtonTextColor: "",
  },
  [Theme.Light]: {
    themeName: Theme.Light,
    mainColor: "#FFF",
    secondaryColor: "#000",
    tertiaryColor: "#D5D7E1",
    primaryTextColor: "#000",
    secondaryTextColor: "#FFF",
    buttonBackground: "#000",
    buttonTextColor: "#FFF",
    hoveredButtonBackground: "#D5D7E1",
    hoveredButtonTextColor: "#000",
  },
  [Theme.Dark]: {
    themeName: Theme.Dark,
    mainColor: "#000",
    secondaryColor: "#FFF",
    tertiaryColor: "#5e5e5e",
    primaryTextColor: "#FFF",
    secondaryTextColor: "#FFF",
    buttonBackground: "#FFF",
    buttonTextColor: "#000",
    hoveredButtonBackground: "#5e5e5e",
    hoveredButtonTextColor: "#000",
  },
};
