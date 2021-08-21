import {
  SET_COLUMNS,
  SET_INITIAL_MOVIES_IDS,
  SET_MOVIES,
} from "../redux/constants";


export interface IInitialMovieItem {
  id: number,
  title: string,
  poster_path: string,
  release_date: string,
};

export interface IMovie {
  id: number;
  title: string;
  imageURL: string;
  release_year: string;
  isVisible: boolean;
};


export interface IColumn {
  id: string;
  title: string;
  moviesIds: Array<number>;
};

export interface IMoviesState {
  movies: Array<IMovie>;
  columns: {
    [key: string]: IColumn;
  };
  columnsIds: Array<string>;
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

export type MoviesAction =
  | ISetMoviesAction
  | ISetInitialMoviesIds
  | ISetColumns;
