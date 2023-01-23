import { createTheme } from "@mui/material/styles";

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
};

export const oneDark = createTheme({
  background: {
    main: oneDarkTheme.bgColor,
  },
  main: {
    main: oneDarkTheme.mainColor,
  },
  caret: {
    main: oneDarkTheme.caretColor,
  },
  sub: {
    main: oneDarkTheme.subColor,
    alt: oneDarkTheme.subAltColor,
  },
  text: {
    main: oneDarkTheme.textColor,
  },
  error: {
    main: oneDarkTheme.errorColor,
    extra: oneDarkTheme.errorExtraColor,
    colorful: oneDarkTheme.colorfulErrorColor,
    colorfulExtra: oneDarkTheme.colorfulErrorExtraColor,
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
export const theme = createTheme({
  background: {
    main: "#282a36",
  },
  main: {
    main: "#f2f2f2",
  },
  caret: {
    main: "#f2f2f2",
  },
  sub: {
    main: "#bd93f9",
    alt: "#20222c",
  },
  text: {
    main: "#f2f2f2",
  },
  error: {
    main: "#f758a0",
    extra: "#732e51",
    colorful: "#f758a0",
    colorfulExtra: "#732e51",
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
