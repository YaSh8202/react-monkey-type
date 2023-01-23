import { configureStore } from "@reduxjs/toolkit";
import testSliceReducer from "./testSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import themeSlice from "./themeSlice";

export const store = configureStore({
  reducer: {
    test: testSliceReducer,
    theme: themeSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
