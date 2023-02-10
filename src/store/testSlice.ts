import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import english from "../languages/english.json";
import { RootState } from "./store";
import { getWords } from "../util/modeHelpers";
import {
  Mode2,
  quoteLengthOptionsType,
  wordLengthOptionsType,
} from "../typings";

// type Mode2 = "time" | "words" | "quote";

export const wordLengthOptions: wordLengthOptionsType[] = [10, 25, 50, 100];
export const quoteLengthOptions: quoteLengthOptionsType[] = [
  "all",
  "short",
  "medium",
  "long",
  "thicc",
  "search",
];

export interface TestState {
  userText: string;
  isRunning: boolean;
  wordsList: string[];
  time: 15 | 30 | 60 | 120;
  timerCount: number;
  currentWordIndex: number;
  correctWords: boolean[];
  wpm: number;
  searchQuoteModal: boolean;
  // currentCharIndex: number;
  // current: string;
  // history: string[];
  punctuation: boolean;
  numbers: boolean;
  mode2: Mode2;
  wordLength: 10 | 25 | 50 | 100;
  quoteLength: quoteLengthOptionsType;
  showResult: boolean;
  wpmHistory: {
    time: number;
    wpm: number;
  }[];
  rawHistory: {
    time: number;
    wpm: number;
  }[];
  searchQuote: string[] | null;
}

const initialState: TestState = {
  userText: "",
  wordsList: [...english.words].sort(() => Math.random() - 0.5),
  isRunning: false,
  time: 30,
  timerCount: 0,
  wpm: 0,
  currentWordIndex: 0,
  correctWords: [],
  // currentCharIndex: 0,
  // current: "",
  // history: [],
  wordLength: 25,
  mode2: "time" as Mode2,
  punctuation: false,
  numbers: false,
  quoteLength: "all",
  showResult: false,
  wpmHistory: [],
  rawHistory: [],
  searchQuoteModal: false,
  searchQuote: null,
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    startTest: (state) => {
      state.isRunning = true;
      state.userText = "";
      state.timerCount = 0;
      state.currentWordIndex = 0;
      state.correctWords = [];
      state.showResult = false;
      state.wpmHistory = [];
      state.rawHistory = [];
    },
    resetTest: (state) => {
      state.isRunning = false;
      state.userText = "";
      state.timerCount = 0;
      state.currentWordIndex = 0;
      state.correctWords = [];
      state.wordsList =
        state.quoteLength === "search"
          ? state.wordsList
          : getWords(
              state.punctuation,
              state.numbers,
              state.mode2,
              state.time,
              state.wordLength,
              state.quoteLength
            );
      state.wpm = 0;
      state.showResult = false;
      state.wpmHistory = [];
      state.rawHistory = [];
    },
    stopTest: (state) => {
      state.isRunning = false;
      state.userText = "";
      state.showResult = true;
    },
    setUserText: (state, action: PayloadAction<string>) => {
      if (!state.isRunning) return;

      const value = action.payload;
      if (value.endsWith(" ")) {
        if (
          (state.mode2 === "time" && state.time <= state.timerCount) ||
          state.currentWordIndex === state.wordsList.length - 1
        ) {
          state.isRunning = false;
          testSlice.caseReducers.stopTest(state);
        } else {
          state.userText = "";
        }
        state.correctWords[state.currentWordIndex] =
          value.trim() === state.wordsList[state.currentWordIndex];
        state.currentWordIndex += 1;

        return;
      }
      state.userText = value;
      if (state.wordsList[state.currentWordIndex].startsWith(value)) {
        state.correctWords[state.currentWordIndex] = true;
      } else {
        state.correctWords[state.currentWordIndex] = false;
      }
    },

    incrementTimer: (state, action: PayloadAction<NodeJS.Timer>) => {
      state.timerCount += 1;

      if (state.timerCount === 0) {
        state.wpm = state.correctWords.filter(Boolean).length;
      } else {
        state.wpm =
          state.correctWords.filter(Boolean).length / (state.timerCount / 60);
        state.wpmHistory.push({
          time: state.timerCount,
          wpm: state.wpm,
        });
        state.rawHistory.push({
          time: state.timerCount,
          wpm: state.correctWords.length / (state.timerCount / 60),
        });
      }

      if (state.mode2 === "time" && state.timerCount >= state.time) {
        clearInterval(action.payload);
        state.isRunning = false;
        state.userText = "";
        state.showResult = true;
      }
    },
    updateTime(state, action: PayloadAction<15 | 30 | 60 | 120>) {
      state.time = action.payload;
      testSlice.caseReducers.resetTest(state);
    },
    setMode2(state, action: PayloadAction<Mode2>) {
      state.mode2 = action.payload;
      testSlice.caseReducers.resetTest(state);
    },
    togglePunctuation(state) {
      state.punctuation = !state.punctuation;
      testSlice.caseReducers.resetTest(state);
    },
    toggleNumbers(state) {
      state.numbers = !state.numbers;
      testSlice.caseReducers.resetTest(state);
    },
    setWordLength(state, action: PayloadAction<wordLengthOptionsType>) {
      state.wordLength = action.payload;
      testSlice.caseReducers.resetTest(state);
    },
    setQuoteLength(state, action: PayloadAction<quoteLengthOptionsType>) {
      if (action.payload === "search") {
        state.searchQuoteModal = true;
        return;
      }
      state.quoteLength = action.payload;
      testSlice.caseReducers.resetTest(state);
    },
    setSearchQuote(state, action: PayloadAction<string[]>) {
      state.wordsList = action.payload;
      state.searchQuoteModal = false;
      state.quoteLength = "search";
    },
    closeSearchModal(state) {
      state.searchQuoteModal = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startTest,
  stopTest,
  setUserText,
  incrementTimer,
  resetTest,
  setMode2,
  updateTime,
  togglePunctuation,
  toggleNumbers,
  setWordLength,
  setQuoteLength,
  setSearchQuote,
  closeSearchModal,
} = testSlice.actions;

export default testSlice.reducer;

export const selectUserText = (state: RootState) => state.test.userText;
export const selectWordsList = (state: RootState) => state.test.wordsList;

export const accuracySelector = (state: RootState) => {
  const { correctWords } = state.test;
  const totalWords = correctWords.length;
  const correctWordsCount = correctWords.filter(Boolean).length;
  return Math.ceil((correctWordsCount / totalWords) * 100);
};

export const rawSpeedSelector = (state: RootState) => {
  return Math.ceil(
    state.test.correctWords.length / (state.test.timerCount / 60)
  );
};
