import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface WordsState {
  wordsList: string[],
  length: number,
  currentIndex: number,
  
}

const initialState: WordsState = {
  wordsList: [],
  length: 0,
  currentIndex: 0,
}

export const WordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    pushWord: (state, action: PayloadAction<string>) => {
      state.wordsList.push(action.payload)
      state.length += 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { pushWord } = WordsSlice.actions

export default WordsSlice.reducer