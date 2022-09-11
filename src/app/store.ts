import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import pokeReducer from "./features/Pokedex/pokeSlice";
export const store = configureStore({
  reducer: {
    pokedex: pokeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
