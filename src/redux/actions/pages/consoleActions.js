export const setHomes = (value) => (dispatch) => {
    dispatch({ type: "SET_HOMES", payload: value });
  };
  
  export const setSelectedHome = (value) => (dispatch) => {
    dispatch({ type: "SET_SELECTED_HOME", payload: value });
  };

  export const setCreateHomeLoading = (value) => (dispatch) => {
    dispatch({ type: "SET_CREATE_HOME_LOADING", payload: value });
  };
  
  export const setNewUserTokenLoading = (value) => (dispatch) => {
    dispatch({ type: "SET_NEW_USER_TOKEN_LOADING", payload: value });
  };

  export const setNewUserToken = (value) => (dispatch) => {
    dispatch({ type: "SET_NEW_USER_TOKEN", payload: value });
  };
  
  
  export const setAppLoading = (value) => (dispatch) => {
    dispatch({ type: "SET_APP_LOADING", payload: value });
  };

