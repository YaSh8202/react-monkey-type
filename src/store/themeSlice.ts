import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { themesMap } from "../styles/theme";
import { CustomTheme } from "@/typings";

export interface ThemeState {
  theme: CustomTheme;
  themeModalOpen: boolean;
}

const initialState: ThemeState = {
  theme: themesMap["oneDark"],
  themeModalOpen: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<CustomTheme>) => {
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
