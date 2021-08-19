import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { movies } from "./reducers/movies";

const composeEnchancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(movies, composeEnchancers(applyMiddleware(thunk)));

export default store;
