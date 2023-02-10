import { combineReducers, configureStore } from "@reduxjs/toolkit";
import testSliceReducer from "./testSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import themeSlice from "./themeSlice";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";

const persistConfig = {
  key: "root",
  storage,
  stateReconcliler: autoMergeLevel1,
};
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ theme: themeSlice, test: testSliceReducer })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
