const initialState = {
  loading: {
    // set loading for different sections of this page
    main: false,
  },
  accounts_data: [],
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACCOUNTS":
      return {
        ...state,
        accounts_data: action.payload,
      };

    default:
      return state;
  }
};

export default accountReducer;
