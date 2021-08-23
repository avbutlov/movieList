import { Dispatch } from "react";
import TmdapiService from "../../services/tmdapiService";
import {
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_SUCCESS,
  SET_COLUMNS,
  SET_INITIAL_MOVIES_IDS,
  SET_MOVIES,
  SET_MOVIES_STATE,
} from "../constants";
import {
  IColumn,
  ISetColumns,
  ISetInitialMoviesIds,
  ISetMoviesAction,
  IMovie,
  MoviesAction,
  IFetchMoviesSuccess,
  IFetchMoviesFailure,
  ISetMoviesState,
  IMoviesState,
} from "../../types/movies.js";

export const fetchMovies = () => async (dispatch: Dispatch<MoviesAction>) => {
  const tmdapiService = new TmdapiService();
  try {
    const fetchedMovies = await tmdapiService.getMovieList("top_rated");
    const moviesIds = fetchedMovies.map((movieItem: IMovie) => movieItem.id);
    dispatch(fetchMoviesSuccess());
    dispatch(setMovies(fetchedMovies));
    dispatch(setInitialMoviesIds(moviesIds));
  } catch (error) {
    dispatch(fetchMoviesFailure());
  }
};

export const setMoviesState = (moviesState: IMoviesState): ISetMoviesState => ({
  type: SET_MOVIES_STATE,
  payload: moviesState,
});

const fetchMoviesSuccess = (): IFetchMoviesSuccess => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: {
    error: false,
  },
});

export const fetchMoviesFailure = (): IFetchMoviesFailure => ({
  type: FETCH_MOVIES_FAILURE,
  payload: {
    error: true,
  },
});

export const setMovies = (movies: Array<IMovie>): ISetMoviesAction => ({
  type: SET_MOVIES,
  payload: movies,
});

export const setInitialMoviesIds = (
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
