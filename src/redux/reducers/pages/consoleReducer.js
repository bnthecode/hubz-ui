const initialState = {
  loading: {
    create_home: false,
    main: false,
  },
  create_home_data: {
    create_home_success: {},
    profile_setup: {},
    new_user_setup: {
      new_user_token: "",
    },
  },
  homes: [],
  selectedHome: {},
};
// main container where all pages are loaded from
/// combine reducers to handle this page 
const consoleReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case "SET_CREATE_HOME_LOADING":
      return {
        ...state,
        loading: {
          ...state.loading,
          create: action.payload,
        },
      };
    case "SET_NEW_USER_TOKEN_LOADING":
      return {
        ...state,
        loading: {
          ...state.loading,
          user_token: action.payload,
        },
      };
    case "SET_NEW_USER_TOKEN":
      return {
        ...state,
        create_home_data: {
          ...state.create_home_data,
          new_user_setup: {
            ...state.create_home_data.new_user_setup,
            new_user_token: action.payload,
          },
        },
      };
    default:
      return state;
  }
};

export default consoleReducer;
