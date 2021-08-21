import { Dispatch } from "react";
import TmdapiService from "../../services/tmdapiService";
import { SET_COLUMNS, SET_INITIAL_MOVIES_IDS, SET_MOVIES } from "../constants";
import {
  IColumn,
  ISetColumns,
  ISetInitialMoviesIds,
  ISetMoviesAction,
  IMovie,
  MoviesAction,
} from "../../types/movies.js";

export const fetchMovies = () => async (dispatch: Dispatch<MoviesAction>) => {
  const tmdapiService = new TmdapiService();
  const fetchedMovies = await tmdapiService.getMovieList("top_rated");
  const moviesIds = fetchedMovies.map((movieItem: IMovie) => movieItem.id);
  dispatch(setMovies(fetchedMovies));
  dispatch(setMoviesIds(moviesIds));
};

export const setMovies = (movies: Array<IMovie>): ISetMoviesAction => ({
  type: SET_MOVIES,
  payload: movies,
});

export const setMoviesIds = (
  moviesIds: Array<number>
): ISetInitialMoviesIds => ({
  type: SET_INITIAL_MOVIES_IDS,
  payload: moviesIds,
});

export const setColumns = (
  columnsData: Record<string, IColumn>
): ISetColumns => ({
  type: SET_COLUMNS,
  payload: columnsData,
});
