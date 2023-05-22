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
  | "thicc"
  | "search";

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
};

export type HistoryType = {
  time: number;
  wpm: number;
};


export interface Letter {
  letter: string;
  status: "correct" | "wrong" | "extra" | "untouched";
  wordIndex: number;
  charIndex: number;
}