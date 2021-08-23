import {
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_SUCCESS,
  SET_COLUMNS,
  SET_INITIAL_MOVIES_IDS,
  SET_MOVIES,
  SET_MOVIES_STATE,
} from "../constants";
import { IMoviesState, MoviesAction } from "../../types/movies";

const initialState: IMoviesState = {
  movies: [],
  columns: {
    firstColumn: {
      id: "firstColumn",
      title: "Unseen",
      moviesIds: [],
    },
    secondColumn: {
      id: "secondColumn",
      title: "Want to watch",
      moviesIds: [],
    },
    thirdColumn: {
      id: "thirdColumn",
      title: "Watched",
      moviesIds: [],
    },
  },
  columnsIds: ["firstColumn", "secondColumn", "thirdColumn"],
  error: false,
};

export const movies = (
  state = initialState,
  action: MoviesAction
): IMoviesState => {
  switch (action.type) {
    case SET_MOVIES_STATE:
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    case SET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };

    case SET_INITIAL_MOVIES_IDS:
      return {
        ...state,
        columns: {
          ...state.columns,
          firstColumn: {
            ...state.columns.firstColumn,
            moviesIds: action.payload,
          },
        },
      };

    case SET_COLUMNS:
      return {
        ...state,
        columns: action.payload,
      };

    default:
      return state;
  }
};
