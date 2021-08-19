import TmdapiService from "../../services/tmdapiService.js";

export const fetchMovies = () => async (dispatch) => {
  const tmdapiService = new TmdapiService();
  const fetchedMovies = await tmdapiService.getMovieList("top_rated");
  const moviesIds = fetchedMovies.map((movieItem) => movieItem.id);
  dispatch(setMovies(fetchedMovies));
  dispatch(setMoviesIds(moviesIds));
};

export const setMovies = (movies) => ({
  type: "SET_MOVIES",
  payload: movies,
});

export const setMoviesIds = (moviesIds) => ({
  type: "SET_INITIAL_MOVIES_IDS",
  payload: moviesIds,
});

export const setColumns = (columnsData) => ({
  type: "SET_COLUMNS",
  payload: columnsData,
});
