export const clearNotification = () => (dispatch) =>
  dispatch({ type: "CLEAR_NOTIFICATION" });

export const setNotification = ({ message, type }) => ({
  type: "SET_NOTIFICATION",
  payload: {
    message,
    type,
  },
});

export const setHomes = (value) => (dispatch) => {
  dispatch({ type: "SET_HOMES", payload: value });
};

export const setSelectedHome = (value) => (dispatch) => {
  dispatch({ type: "SET_SELECTED_HOME", payload: value });
};

export const setAppLoading = (value) => (dispatch) => {
  dispatch({ type: "SET_APP_LOADING", payload: value });
};
