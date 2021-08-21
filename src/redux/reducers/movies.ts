import { SET_COLUMNS, SET_INITIAL_MOVIES_IDS, SET_MOVIES } from "../constants";
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
};

export const movies = (state = initialState, action: MoviesAction): IMoviesState => {
  switch (action.type) {
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
