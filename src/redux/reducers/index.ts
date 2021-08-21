import { combineReducers } from "redux";
import { movies } from "./movies";

export const rootReducer = combineReducers({
  moviesReducer: movies,
});

export type RootState = ReturnType<typeof rootReducer>;
