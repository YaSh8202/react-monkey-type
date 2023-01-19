import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import english from "../languages/english.json";
import { RootState } from "./store";

export interface TestState {
  userText: string;
  isRunning: boolean;
  wordsList: string[];
  time: 15 | 30 | 60;
  timerCount: number;
}

const initialState: TestState = {
  userText: "",
  wordsList: english.words,
  isRunning: false,
  time: 15,
  timerCount: 0,
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    startTest: (state) => {
      state.isRunning = true;
      state.userText = "";
      state.timerCount = 0;
    },
    stopTest: (state) => {
      state.isRunning = false;
    },
    setTime: (state, action: PayloadAction<15 | 30 | 60>) => {
      state.time = action.payload;
    },
    setUserText: (state, action: PayloadAction<string>) => {
      state.userText = action.payload;
    },
    incrementTimer: (state) => {
      state.timerCount += 1;
      if (state.timerCount >= state.time) {
        state.isRunning = false;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { startTest, stopTest, setTime, setUserText, incrementTimer } =
  testSlice.actions;

export default testSlice.reducer;

export const selectUserText = (state: RootState) => state.test.userText;
export const selectWordsList = (state: RootState) => state.test.wordsList;
