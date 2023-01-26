export type TimeOptionsType = 15 | 30 | 60 | 120;

export type Mode = "punctuation" | "numbers";

// export type Mode2 = "time" | "words" | "quote";
export enum Mode2 {
  time = "time",
  words = "words",
  quote = "quote",
}

export type wordLengthOptionsType = 10 | 25 | 50 | 100;
export type quoteLengthOptionsType =
  | "all"
  | "short"
  | "medium"
  | "long"
  | "thicc";

export type CustomTheme = {
  bgColor: string;
  caretColor: string;
  mainColor: string;
  subColor: string;
  subAltColor: string;
  textColor: string;
  errorColor: string;
  errorExtraColor: string;
  colorfulErrorColor: string;
  colorfulErrorExtraColor: string;
  menuBtn1?: string;
  menuBtn2?: string;
  menuBtn3?: string;
  menuBtn4?: string;
  menuBtn5?: string;
  menuBtn6?: string;
};
