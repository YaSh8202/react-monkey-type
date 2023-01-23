import { createTheme } from "@mui/material/styles";
import { CustomTheme } from "../../typings";

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
  oneDark = "oneDark",
  dracula = "dracula",
  joker = "joker",
}

export function getTheme(theme: Themes) {
  switch (theme) {
    case Themes.dracula:
      return createThemeFunc(dracula);
    case Themes.joker:
      return createThemeFunc(joker);
    default:
      return createThemeFunc(oneDarkTheme);
  }
}
