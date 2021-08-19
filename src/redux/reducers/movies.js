const initialState = {
  movies: [],
  columns: {
    firstColumn: {
      id: "firstColumn",
      title: "Unseen",
      moviesIds: [],
    },
    secondColumn: {
      id: "secondColumn",
      title: "Watched",
      moviesIds: [],
    },
  },
  columnsIds: ["firstColumn", "secondColumn"],
};

export const movies = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.payload,
      };

    case "SET_INITIAL_MOVIES_IDS":
      return {
        ...state,
        columns: {
          ...state.columns,
          firstColumn: {
            ...state.columns["firstColumn"],
            moviesIds: action.payload,
          },
        },
      };

      case "SET_COLUMNS":
        return {
          ...state,
          columns: action.payload
        };

    default:
      return state;
  }
};

