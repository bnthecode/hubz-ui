const initialState = {
  notification: {
    message: {
      content: null,
      title: null,
    },
    type: null,
  },
  homes: [],
  selectedHome: {},
  appLoading: {
    loading: false,
    message: "",
  },
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        ...state,
        notification: action.payload,
      };
    case "CLEAR_NOTIFICATION":
      return {
        ...state,
        notification: initialState.notification,
      };
    case "SET_SELECTED_HOME":
      return {
        ...state,
        selectedHome: {
          ...state.selectedHome,
          ...action.payload,
        },
      };
    case "SET_HOMES":
      return {
        ...state,
        homes: action.payload,
      };
    case "SET_APP_LOADING":
      return {
        ...state,
        appLoading: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
