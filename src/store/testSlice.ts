import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import english from "../languages/english.json";
import { RootState } from "./store";
import { getWords } from "../util/modeHelpers";
import {
  Letter,
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

function createLetters(words: string[]): Letter[][] {
  return words.map((word, i) => {
    const letters = word.split("");
    return letters.map((l, j) => ({
      letter: l,
      status: "untouched",
      charIndex: j,
      wordIndex: i,
    }));
  });
}

function getCharactersTyped(words: Letter[][]) {
  const chars = {
    correct: 0,
    wrong: 0,
    extra: 0,
  };

  words.forEach((word) => {
    word.forEach((letter) => {
      if (letter.status === "correct") {
        chars.correct += 1;
      } else if (letter.status === "wrong") {
        chars.wrong += 1;
      } else if (letter.status === "extra") {
        chars.extra += 1;
      }
    });
  });

  return chars;
}

interface caretPosition {
  top: number;
  left: number;
}

export interface TestState {
  isRunning: boolean;
  wordsList: string[];
  currentWords: Letter[][];
  time: 15 | 30 | 60 | 120;
  timerCount: number;
  currentWordIndex: number;
  correctWords: boolean[];
  wpm: number;
  searchQuoteModal: boolean;
  currentCharIndex: number;
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
  caretPosition: caretPosition;
  startTime: Date | null;
  isInputFocused: boolean;
}

const randomizedWords = [...english.words].sort(() => Math.random() - 0.5);

const initialState: TestState = {
  wordsList: randomizedWords,
  currentWords: createLetters(randomizedWords),
  isRunning: false,
  time: 30,
  timerCount: 0,
  wpm: 0,
  currentWordIndex: 0,
  correctWords: [],
  currentCharIndex: 0,
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
  caretPosition: {
    top: 5,
    left: 0,
  },
  startTime: null,
  isInputFocused: true,
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    startTest: (state) => {
      state.isRunning = true;
      state.timerCount = 0;
      state.currentWordIndex = 0;
      state.correctWords = [];
      state.showResult = false;
      state.wpmHistory = [];
      state.rawHistory = [];
      state.currentCharIndex = 0;
      state.caretPosition = {
        top: 5  ,
        left: 0,
      };
      state.startTime = new Date();
    },
    resetTest: (state) => {
      state.isRunning = false;
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
      state.currentWords = createLetters(state.wordsList);
      state.wpm = 0;
      state.showResult = false;
      state.wpmHistory = [];
      state.rawHistory = [];
      state.currentCharIndex = 0;
      state.caretPosition = {
        top: 5,
        left: 0,
      };
      state.startTime = null;
      state.isInputFocused = true;

    },
    stopTest: (state) => {
      state.isRunning = false;
      state.showResult = true;
      state.caretPosition = {
        top: 5,
        left: 0,
      };
      state.startTime = null;
    },
    setUserText: (state, action: PayloadAction<string>) => {
      if (!state.isRunning) return;

      const typedLetter = action.payload;
      const expectedLetter =
        state.currentWords[state.currentWordIndex][state.currentCharIndex];

      if (typedLetter === "Backspace") {
        if (state.currentCharIndex === 0) {
          if (state.currentWordIndex === 0) return;
          state.currentWordIndex -= 1;
          let newCharIndex = state.currentWords[state.currentWordIndex].length;

          while (
            state.currentWords[state.currentWordIndex][newCharIndex - 1]
              .status === "untouched"
          ) {
            newCharIndex--;
          }
          state.currentCharIndex = newCharIndex;
          return;
        }
        state.currentCharIndex -= 1;
        const isExtra =
          state.currentWords[state.currentWordIndex][state.currentCharIndex]
            .status === "extra";

        if (isExtra) {
          state.currentWords[state.currentWordIndex].pop();
          return;
        }
        state.currentWords[state.currentWordIndex][
          state.currentCharIndex
        ].status = "untouched";
        return;
      }

      if (typedLetter === " ") {
        if (state.currentCharIndex === 0) {
          return;
        }
        state.currentWordIndex += 1;
        state.currentCharIndex = 0;
        return;
      }

      if (
        state.currentWords[state.currentWordIndex].length ===
        state.currentCharIndex
      ) {
        state.currentWords[state.currentWordIndex].push({
          letter: typedLetter,
          status: "extra",
          wordIndex: state.currentWordIndex,
          charIndex: state.currentCharIndex,
        });
        state.currentCharIndex += 1;
        return;
      }

      if (expectedLetter.letter === typedLetter) {
        state.currentWords[state.currentWordIndex][
          state.currentCharIndex
        ].status = "correct";
      } else {
        state.currentWords[state.currentWordIndex][
          state.currentCharIndex
        ].status = "wrong";
      }

      state.currentCharIndex += 1;

      // if mode is word limit or quote mode and user has typed the last word , stop the test
      if (
        (state.mode2 === "words" && state.currentWordIndex === state.wordLength - 1 && state.currentCharIndex === state.currentWords[state.currentWordIndex].length) ||
        (state.mode2 === "quote" &&
          state.currentWordIndex === state.wordsList.length - 1 && state.currentCharIndex === state.currentWords[state.currentWordIndex].length)
      ) {
        state.isRunning = false;
        testSlice.caseReducers.stopTest(state);
        return;
      }

      // if (value.endsWith(" ")) {
      //   if (
      //     (state.mode2 === "time" && state.time <= state.timerCount) ||
      //     state.currentWordIndex === state.wordsList.length - 1
      //   ) {
      //     state.isRunning = false;
      //     testSlice.caseReducers.stopTest(state);
      //   } else {
      //     state.userText = "";
      //   }
      //   state.correctWords[state.currentWordIndex] =
      //     value.trim() === state.wordsList[state.currentWordIndex];
      //   state.currentWordIndex += 1;

      //   return;
      // }

      // state.userText = value;
      // if (state.wordsList[state.currentWordIndex].startsWith(value)) {
      //   state.correctWords[state.currentWordIndex] = true;
      // } else {
      //   state.correctWords[state.currentWordIndex] = false;
      // }
    },

    incrementTimer: (state, action: PayloadAction<NodeJS.Timer>) => {
      state.timerCount += 1;

      if (state.timerCount === 0) {
        state.wpm = state.correctWords.filter(Boolean).length;
      } else {
        state.wpm =
          state.correctWords.filter(Boolean).length / (state.timerCount / 60);
        // state.wpmHistory.push({
        //   time: state.timerCount,
        //   wpm: state.wpm,
        // });
        // state.rawHistory.push({
        //   time: state.timerCount,
        //   wpm: state.correctWords.length / (state.timerCount / 60),
        // });
      }

      if (state.mode2 === "time" && state.timerCount >= state.time) {
        clearInterval(action.payload);
        state.isRunning = false;
        state.showResult = true;
      }
    },
    setInputFocus(state, action: PayloadAction<boolean>) {
      state.isInputFocused = action.payload;
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
    setCaretPosition(state, action: PayloadAction<caretPosition>) {
      state.caretPosition = action.payload;
    },

    calculateWMP(state) {
      if (!state.startTime) return;

      let timeElapsed =
        (new Date().getTime() - state.startTime.getTime()) / 1000;

      if (timeElapsed < 1) return;

      timeElapsed = Math.floor(timeElapsed);

      const charsTyped = getCharactersTyped(state.currentWords);
      const wpm = Math.ceil(charsTyped.correct / 4 / (timeElapsed / 60));
      const rawWpm = Math.ceil(
        (charsTyped.correct + charsTyped.wrong + charsTyped.extra) /
          4 /
          (timeElapsed / 60)
      );
      state.wpmHistory.push({
        time: timeElapsed,
        wpm,
      });
      state.rawHistory.push({
        time: timeElapsed,
        wpm: rawWpm,
      });
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
  setCaretPosition,
  calculateWMP,
  setInputFocus,
} = testSlice.actions;

export default testSlice.reducer;

export const selectWordsList = (state: RootState) => state.test.wordsList;

export const accuracySelector = (state: RootState) => {
  const { correctWords } = state.test;
  const totalWords = correctWords.length;
  const correctWordsCount = correctWords.filter(Boolean).length;
  return Math.ceil((correctWordsCount / totalWords)) * 100;
};

export const rawSpeedSelector = (state: RootState) => {
  return Math.ceil(
    state.test.correctWords.length / (state.test.timerCount / 60)
  );
};

export const wpmSelector = (state: RootState) => {
  return state.test.wpmHistory[state.test.wpmHistory.length - 1]?.wpm || 0;
};

export const rawWpmSelector = (state: RootState) => {
  return state.test.rawHistory[state.test.rawHistory.length - 1]?.wpm || 1;
};
