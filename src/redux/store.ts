import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { stateSaver } from "./middlewares/stateSaver";
import { rootReducer } from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk, stateSaver));

export default store;
