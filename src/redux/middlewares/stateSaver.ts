import { Dispatch, Middleware, MiddlewareAPI } from "redux";

export const stateSaver: Middleware =
  (store: MiddlewareAPI) => (next: Dispatch) => (action) => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem("state", JSON.stringify(state));
    return result;
  };
