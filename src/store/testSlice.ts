import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import english from "../languages/english.json";
import { RootState } from "./store";
import { numbersMode, punctuations } from "../util/modeHelpers";

type Mode2 = "time" | "words" | "quote";

export interface TestState {
  userText: string;
  isRunning: boolean;
  wordsList: string[];
  time: 15 | 30 | 60 | 120;
  timerCount: number;
  // caretPosition: {
  //   left: number;
  //   top: number;
  // };
  currentWordIndex: number;
  correctWords: boolean[];
  wpm: number;
  // currentCharIndex: number;
  // current: string;
  // history: string[];
  punctuation: boolean;
  numbers: boolean;
  mode2: Mode2;
}

const initialState: TestState = {
  userText: "",
  wordsList: [...english.words].sort(() => Math.random() - 0.5),
  isRunning: false,
  time: 30,
  timerCount: 0,
  wpm: 0,
  // caretPosition: {
  //   left: 0,
  //   top: 0,
  // },
  currentWordIndex: 0,
  correctWords: [],
  // currentCharIndex: 0,
  // current: "",
  // history: [],
  mode2: "time",
  punctuation: false,
  numbers: false,
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
    },
    resetTest: (state) => {
      state.isRunning = false;
      state.userText = "";
      state.timerCount = 0;
      state.currentWordIndex = 0;
      state.correctWords = [];
      state.wordsList = (
        state.punctuation && state.numbers
          ? numbersMode(punctuations([...english.words]))
          : state.punctuation
          ? punctuations([...english.words])
          : state.numbers
          ? numbersMode([...english.words])
          : [...english.words]
      ).sort(() => Math.random() - 0.5);
      state.wpm = 0;
    },
    stopTest: (state) => {
      state.isRunning = false;
      state.userText = "";
    },
    setUserText: (state, action: PayloadAction<string>) => {
      if (!state.isRunning) return;

      const value = action.payload;
      if (value.endsWith(" ")) {
        if (
          state.time <= state.timerCount ||
          state.currentWordIndex === state.wordsList.length - 1
        ) {
          state.isRunning = false;
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
        state.wpm = Math.ceil(
          state.correctWords.filter(Boolean).length / (state.timerCount / 60)
        );
      }

      if (state.timerCount >= state.time) {
        clearInterval(action.payload);
        state.isRunning = false;
        state.userText = "";
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
