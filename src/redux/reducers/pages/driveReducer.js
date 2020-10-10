const initialState = {
  loading: {
    // set loading for different sections of this page
    main: false,
    drive: false,
    recentActivity: false,
    preview: false,
  },
  drive_data: {
    folders: [],
    files: [],
  },
  selectedItem: {},
};

const driveReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DRIVE":
      return {
        ...state,
        drive_data: action.payload,
      };
    case "SET_DRIVE_LOADING":
      return {
        ...state,
        loading: {
          ...state.loading,
          drive: action.payload,
        },
      };
    case "SET_SELECTED_DRIVE_ITEM":
      return {
        ...state,
        selectedItem: action.payload,
      };
    case "SET_DRIVE_FOLDERS":
      return {
        ...state,
        drive_data: {
          ...state.drive_data,
          folders: action.payload,
        },
      };

    default:
      return state;
  }
};

export default driveReducer;
