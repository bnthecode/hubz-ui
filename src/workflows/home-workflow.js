import { createHome, getHomes, getHome } from "../services/http/home-http";
import {
  setHomes,
  setSelectedHome,
  setAppLoading,
} from "../redux/actions/uiActions";
import { createDriveWorkflow } from "./drive-workflow";

// determine what actions / http we want to perform on home creation

export const createHomeWorkflow = (createdHome) => async (dispatch) => {
  const { home } = await createHome(createdHome);
  await dispatch(setSelectedHome(home));
  await dispatch(createDriveWorkflow());
  await dispatch(getHomesWorkflow());
};

export const getHomesWorkflow = () => async (dispatch) => {
  const { homes } = await getHomes();
  await dispatch(setHomes(homes));
  await dispatch(selectHomeWorkflow(homes[0].id));
};

export const selectHomeWorkflow = (homeId) => async (dispatch) => {
  await dispatch(
    setAppLoading({ loading: true, message: "Getting your home." })
  );
  const { home } = await getHome(homeId);
  await dispatch(setSelectedHome(home));
  await dispatch(setAppLoading({ loading: false, message: "" }));
};
