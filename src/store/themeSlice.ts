import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Themes } from "../styles/theme";

export interface ThemeState {
  theme: Themes;
  themeModalOpen: boolean;
}

const initialState: ThemeState = {
  theme: Themes.oneDark,
  themeModalOpen: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Themes>) => {
      state.theme = action.payload;
      state.themeModalOpen = false;
    },
    closeModal: (state) => {
      state.themeModalOpen = !state.themeModalOpen;
    },
    openModal: (state) => {
      state.themeModalOpen = true;
    },
  },
});

export const { setTheme, closeModal, openModal } = themeSlice.actions;
export default themeSlice.reducer;
