export const clearNotification = () => (dispatch) =>
  dispatch({ type: "CLEAR_NOTIFICATION" });

export const setNotification = ({ message, type }) => ({
  type: "SET_NOTIFICATION",
  payload: {
    message,
    type,
  },
});
