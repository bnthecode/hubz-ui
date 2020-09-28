const initialState = {
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_OUT":
      return {
        ...state,
        user: initialState.user,
      };

    case "SET_USER":
      return {
        ...state,
        user: {
          // not sure what to do here
          new: true,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default authReducer;
