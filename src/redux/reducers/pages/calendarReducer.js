const initialState = {
  loading: {
    // set loading for different sections of this page
    main: false,
    creating_event: false,
  },
  calendar_data: {
    events: [],
  },
  selected_date: {},
};

const driveReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CALENDAR_EVENTS":
      return {
        ...state,
        calendar_data: {
          ...state.calendar_data,
          events: action.payload,
        },
      };

    default:
      return state;
  }
};

export default driveReducer;
