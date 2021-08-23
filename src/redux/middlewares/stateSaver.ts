import { Dispatch, Middleware, MiddlewareAPI } from "redux";

export const stateSaver: Middleware =
  (store: MiddlewareAPI) => (next: Dispatch) => (action) => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem("appState", JSON.stringify(state));
    return result;
  };
