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

const oneDark = {
  id: "onedark",
  title: "One Dark",
  colors: {
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
  },
} as CustomTheme;

const dracula = {
  id: "dracula",
  title: "Dracula",
  colors: {
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
  },
} as CustomTheme;

const joker = {
  id: "joker",
  title: "Joker",
  colors: {
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
  },
} as CustomTheme;

const futureFunk = {
  id: "future funk",
  title: "Future Funk",
  colors: {
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
  },
} as CustomTheme;

const dev = {
  id: "dev",
  title: "Dev",
  colors: {
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
  },
} as CustomTheme;

const moonlight = {
  id: "moonlight",
  title: "Moonlight",
  colors: {
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
  },
} as CustomTheme;

const miamiNights = {
  id: "miami nights",
  title: "Miami Nights",
  colors: {
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
  },
};

const voc = {
  id: "voc",
  title: "VOC",
  colors: {
    bgColor: "#190618",
    mainColor: "#e0caac",
    caretColor: "#e0caac",
    subColor: "#4c1e48",
    subAltColor: "#2c0c28",
    textColor: "#eeeae4",
    errorColor: "#af3735",
    errorExtraColor: "#7e2a29",
    colorfulErrorColor: "#af3735",
    colorfulErrorExtraColor: "#7e2a29",
  },
} as CustomTheme;

const watermelon = {
  id: "watermelon",
  title: "Watermelon",
  colors: {
    bgColor: "#1f4437",
    mainColor: "#d6686f",
    caretColor: "#d6686f",
    subColor: "#3e7a65",
    subAltColor: "#244d3f",
    textColor: "#cdc6bc",
    errorColor: "#c82931",
    errorExtraColor: "#ac1823",
    colorfulErrorColor: "#c82931",
    colorfulErrorExtraColor: "#ac1823",
  },
} as CustomTheme;

const eight008 = {
  id: "eight008",
  title: "8008",
  colors: {
    bgColor: "#333a45",
    mainColor: "#f44c7f",
    caretColor: "#f44c7f",
    subColor: "#939eae",
    subAltColor: "#2e343d", // Chose the last defined --sub-alt-color
    textColor: "#e9ecf0",
    errorColor: "#da3333",
    errorExtraColor: "#791717",
    colorfulErrorColor: "#c5da33",
    colorfulErrorExtraColor: "#849224",
  },
} as CustomTheme;

const afterDark80s = {
  id: "afterDark80s",
  title: "80s After Dark",
  colors: {
    bgColor: "#1b1d36",
    mainColor: "#fca6d1",
    caretColor: "#99d6ea",
    subColor: "#99d6ea",
    subAltColor: "#17182c",
    textColor: "#e1e7ec",
    errorColor: "#fffb85",
    errorExtraColor: "#fffb85",
    colorfulErrorColor: "#fffb85",
    colorfulErrorExtraColor: "#fffb85",
  },
} as CustomTheme;

const arch = {
  id: "arch",
  title: "Arch",
  colors: {
    bgColor: "#0c0d11",
    mainColor: "#7ebab5",
    caretColor: "#7ebab5",
    subColor: "#454864",
    subAltColor: "#171a25",
    textColor: "#f6f5f5",
    errorColor: "#ff4754",
    errorExtraColor: "#b02a33",
    colorfulErrorColor: "#ff4754",
    colorfulErrorExtraColor: "#b02a33",
  },
} as CustomTheme;

const bliss = {
  id: "bliss",
  title: "Bliss",
  colors: {
    bgColor: "#262727",
    mainColor: "#f0d3c9",
    caretColor: "#f0d3c9",
    subColor: "#665957",
    subAltColor: "#343231",
    textColor: "#fff",
    errorColor: "#bd4141",
    errorExtraColor: "#883434",
    colorfulErrorColor: "#bd4141",
    colorfulErrorExtraColor: "#883434",
  },
} as CustomTheme;

const blueberryDark = {
  id: "blueberryDark",
  title: "Blueberry Dark",
  colors: {
    bgColor: "#212b42",
    mainColor: "#add7ff",
    caretColor: "#962f7e",
    subColor: "#5c7da5",
    subAltColor: "#1b2334",
    textColor: "#91b4d5",
    errorColor: "#df4576",
    errorExtraColor: "#d996ac",
    colorfulErrorColor: "#df4576",
    colorfulErrorExtraColor: "#d996ac",
  },
} as CustomTheme;

const bushido = {
  id: "bushido",
  title: "Bushido",
  colors: {
    bgColor: "#242933",
    mainColor: "#ec4c56",
    caretColor: "#ec4c56",
    subColor: "#596172",
    subAltColor: "#1c222d",
    textColor: "#f6f0e9",
    errorColor: "#ec4c56",
    errorExtraColor: "#9b333a",
    colorfulErrorColor: "#ecdc4c",
    colorfulErrorExtraColor: "#bdb03d",
  },
} as CustomTheme;

function createThemeFunc(theme: CustomTheme) {
  return createTheme({
    background: {
      main: theme.colors.bgColor,
    },
    main: {
      main: theme.colors.mainColor,
    },
    caret: {
      main: theme.colors.caretColor,
    },
    sub: {
      main: theme.colors.subColor,
      alt: theme.colors.subAltColor,
    },
    text: {
      main: theme.colors.textColor,
    },
    error: {
      main: theme.colors.errorColor,
      extra: theme.colors.errorExtraColor,
      colorful: theme.colors.colorfulErrorColor,
      colorfulExtra: theme.colors.colorfulErrorExtraColor,
    },

    palette: {
      mode: theme.kind === "light" ? "light" : "dark",
      primary: {
        main: theme.colors.mainColor,
        darker: "#053e85",
        contrastText: "#fff",
      },
      secondary: {
        main: theme.colors.subColor,
        light: theme.colors.subColor,
        dark: theme.colors.subColor,
      },
      neutral: {
        main: theme.colors.subColor,
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
  voc = "voc",
  watermelon = "watermelon",
  eight008 = "eight008",
  afterDark80s = "afterDark80s",
  arch = "arch",
  bliss = "bliss",
  blueberryDark = "blueberryDark",
}

export const themesMap = {
  oneDark,
  dracula,
  joker,
  futureFunk,
  dev,
  moonlight,
  miamiNights,
  voc,
  watermelon,
  eight008,
  afterDark80s,
  arch,
  bliss,
  blueberryDark,
  bushido,
} as Record<string, CustomTheme>;

// export type Themes = keyof typeof themesMap;

export function getTheme(theme: CustomTheme) {
  return createThemeFunc(theme);
}
