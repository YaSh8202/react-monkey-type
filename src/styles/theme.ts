import { createTheme } from "@mui/material/styles";
import { CustomTheme } from "../typings";

declare module "@mui/material/styles" {
  interface Theme {
    background: {
      main: React.CSSProperties["color"];
    };
    main: {
      main: React.CSSProperties["color"];
    };
    caret: {
      main: React.CSSProperties["color"];
    };
    sub: {
      main: React.CSSProperties["color"];
      alt: React.CSSProperties["color"];
    };
    text: {
      main: React.CSSProperties["color"];
    };
    error: {
      main: React.CSSProperties["color"];
      extra: React.CSSProperties["color"];
      colorful: React.CSSProperties["color"];
      colorfulExtra: React.CSSProperties["color"];
    };
  }

  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface ThemeOptions {
    background: {
      main: React.CSSProperties["color"];
    };
    main: {
      main: React.CSSProperties["color"];
    };
    caret: {
      main: React.CSSProperties["color"];
    };
    sub: {
      main: React.CSSProperties["color"];
      alt: React.CSSProperties["color"];
    };
    text: {
      main: React.CSSProperties["color"];
    };
    error: {
      main: React.CSSProperties["color"];
      extra: React.CSSProperties["color"];
      colorful: React.CSSProperties["color"];
      colorfulExtra: React.CSSProperties["color"];
    };
  }
}

const oneDarkTheme = {
  bgColor: "#2f343f",
  caretColor: "#61afef",
  mainColor: "#61afef",
  subColor: "#eceff4",
  subAltColor: "#262b34",
  textColor: "#98c379",
  errorColor: "#e06c75",
  errorExtraColor: "#d62436",
  colorfulErrorColor: "#d62436",
  colorfulErrorExtraColor: "#ff0019",
} as CustomTheme;

const dracula = {
  bgColor: "#282a36",
  caretColor: "#f2f2f2",
  mainColor: "#f2f2f2",
  subColor: "#bd93f9",
  subAltColor: "#20222c",
  textColor: "#f2f2f2",
  errorColor: "#f758a0",
  errorExtraColor: "#732e51",
  colorfulErrorColor: "#f758a0",
  colorfulErrorExtraColor: "#732e51",
} as CustomTheme;

const joker = {
  bgColor: "#1a0e25",
  mainColor: "#99de1e",
  caretColor: "#99de1e",
  subColor: "#7554a3",
  subAltColor: "#14081f",
  textColor: "#e9e2f5",
  errorColor: "#e32b2b",
  errorExtraColor: "#a62626",
  colorfulErrorColor: "#e32b2b",
  colorfulErrorExtraColor: "#a62626",
} as CustomTheme;

const futureFunk = {
  bgColor: "#2e1a47",
  mainColor: "#f7f2ea",
  caretColor: "#f7f2ea",
  subColor: "#c18fff",
  subAltColor: "#27173c",
  textColor: "#f7f2ea",
  errorColor: "#f04e98",
  errorExtraColor: "#bd1c66",
  colorfulErrorColor: "#f04e98",
  colorfulErrorExtraColor: "#bd1c66",
} as CustomTheme;

const dev = {
  bgColor: "#1b2028",
  mainColor: "#23a9d5",
  caretColor: "#4b5975",
  subColor: "#4b5975",
  subAltColor: "#151a21",
  textColor: "#ccccb5",
  errorColor: "#b81b2c",
  errorExtraColor: "#84131f",
  colorfulErrorColor: "#b81b2c",
  colorfulErrorExtraColor: "#84131f",
};

const moonlight = {
  bgColor: "#191f28",
  mainColor: "#c69f68",
  caretColor: "#8f744b",
  subColor: "#4b5975",
  subAltColor: "#191f27",
  textColor: "#ccccb5",
  errorColor: "#b81b2c",
  errorExtraColor: "#84131f",
  colorfulErrorColor: "#b81b2c",
  colorfulErrorExtraColor: "#84131f",
};

const miamiNights = {
  bgColor: "#18181a",
  mainColor: "#e4609b",
  caretColor: "#e4609b",
  subColor: "#47bac0",
  subAltColor: "#0f0f10",
  textColor: "#fff",
  errorColor: "#fff591",
  errorExtraColor: "#b6af68",
  colorfulErrorColor: "#fff591",
  colorfulErrorExtraColor: "#b6af68",
};

function createThemeFunc(theme: CustomTheme) {
  return createTheme({
    background: {
      main: theme.bgColor,
    },
    main: {
      main: theme.mainColor,
    },
    caret: {
      main: theme.caretColor,
    },
    sub: {
      main: theme.subColor,
      alt: theme.subAltColor,
    },
    text: {
      main: theme.textColor,
    },
    error: {
      main: theme.errorColor,
      extra: theme.errorExtraColor,
      colorful: theme.colorfulErrorColor,
      colorfulExtra: theme.colorfulErrorExtraColor,
    },

    palette: {
      primary: {
        main: "#fff",
        darker: "#053e85",
      },
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
  });
}

export enum Themes {
  oneDark = "onedark",
  dracula = "dracula",
  joker = "joker",
  futureFunk = "future funk",
  dev = "dev",
  moonlight = "moonlight",
  miamiNights = "miami nights",
}

export function getTheme(theme: Themes) {
  switch (theme) {
    case Themes.dracula:
      return createThemeFunc(dracula);
    case Themes.joker:
      return createThemeFunc(joker);
    case Themes.futureFunk:
      return createThemeFunc(futureFunk);
    case Themes.dev:
      return createThemeFunc(dev);
    case Themes.moonlight:
      return createThemeFunc(moonlight);
    case Themes.miamiNights:
      return createThemeFunc(miamiNights);
    default:
      return createThemeFunc(oneDarkTheme);
  }
}
