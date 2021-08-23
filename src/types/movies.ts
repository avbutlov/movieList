import {
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_SUCCESS,
  SET_COLUMNS,
  SET_INITIAL_MOVIES_IDS,
  SET_MOVIES,
  SET_MOVIES_STATE,
} from "../redux/constants";

export interface IInitialMovieItem {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export type IMovieKeyType =
  | "id"
  | "title"
  | "imageURL"
  | "release_year"
  | "isVisible";
export interface IMovie {
  id: number;
  title: string;
  imageURL: string;
  release_year: string;
  isVisible: boolean;
}

export interface IColumn {
  id: string;
  title: string;
  moviesIds: Array<number>;
}

export interface IMoviesState {
  movies: Array<IMovie>;
  columns: {
    [key: string]: IColumn;
  };
  columnsIds: Array<string>;
  error: boolean;
}

interface IFetchMoviesResult {
  payload: {
    error: boolean;
  };
}
export interface IFetchMoviesSuccess extends IFetchMoviesResult {
  type: typeof FETCH_MOVIES_SUCCESS;
}

export interface IFetchMoviesFailure extends IFetchMoviesResult {
  type: typeof FETCH_MOVIES_FAILURE;
}
export interface ISetMoviesAction {
  type: typeof SET_MOVIES;
  payload: Array<IMovie>;
}

export interface ISetInitialMoviesIds {
  type: typeof SET_INITIAL_MOVIES_IDS;
  payload: Array<number>;
}

export interface ISetColumns {
  type: typeof SET_COLUMNS;
  payload: {
    [key: string]: IColumn;
  };
}
export interface ISetMoviesState {
  type: typeof SET_MOVIES_STATE,
  payload: IMoviesState
}

export type MoviesAction =
  | ISetMoviesAction
  | ISetInitialMoviesIds
  | ISetColumns
  | IFetchMoviesSuccess
  | IFetchMoviesFailure
  | ISetMoviesState  
  ;
