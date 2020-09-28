import { PURGE } from "redux-persist";

export const setUserLogin = (value) => (dispatch) => {
  dispatch({ type: "SET_USER", payload: value });
};

export const setUserLogout = (value) => (dispatch) => {
  dispatch({ type: PURGE, key: "node-plaid", result: () => null });
  dispatch({ type: "SIGN_OUT", payload: value });
};
