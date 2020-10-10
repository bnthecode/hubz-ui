export const setDrive = (value) => (dispatch) => {
  dispatch({ type: "SET_DRIVE", payload: value });
};

export const setDriveLoading = (value) => (dispatch) => {
  dispatch({ type: "SET_DRIVE_LOADING", payload: value });
};

export const setSelectedDriveItem = (value) => (dispatch) => {
  dispatch({ type: "SET_SELECTED_DRIVE_ITEM", payload: value });
};

export const setDriveFolders = (value) => (dispatch) => {
  dispatch({ type: "SET_DRIVE_FOLDERS", payload: value });
};
