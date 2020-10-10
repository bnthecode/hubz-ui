import { createHome, getHomes, getHome, addHomeUser } from "../../services/http/home-http";
import {
  setHomes,
  setSelectedHome,
  setAppLoading,
  setNewUserToken,
  setCreateHomeLoading,
} from "../../redux/actions/pages/consoleActions";
import { createDrive } from "../../services/http/drive-http";

export const initConsolePageWorkflow = (user) => async (dispatch) => {
  return user.new
    ? await dispatch(initReduxForNewUser(user))
    : await dispatch(initReduxForExistingUser(user));
};

const initReduxForNewUser = (user) => async (dispatch) => {
  return user.created_by
    ? dispatch(initReduxForCreatedUser(user))
    : dispatch(initReduxForBrandNewUser(user));
};

const initReduxForCreatedUser = (user) => async (dispatch) => {
  // this user is given homes by default
  const { homes } = await getHomes();
  dispatch(setHomes(homes));
  const { home } = await getHome(homes[0].id);
  dispatch(setSelectedHome(home));
};

const initReduxForBrandNewUser = (user) => async (dispatch) => {

};

export const createHomeWorkflow = (homeData) => async (dispatch) => {
  const { home: createdHome } = await createHome(homeData);
  const { homes } = await getHomes();
  await createDrive();

  const { home } = await getHome(createdHome.id);
  await dispatch(setHomes(homes));
  await dispatch(setSelectedHome(home));
};

export const selectHomeWorkflow = (homeId) => async (dispatch) => {
  await dispatch(
    setAppLoading({ loading: true, message: "Getting your home." })
  );
  const { home } = await getHome(homeId);
  await dispatch(setSelectedHome(home));
  await dispatch(setAppLoading({ loading: false, message: "" }));
};


export const createHomeUserWorkflow = (homeId, user) => async (dispatch) => {
  const { temp_pw } = await addHomeUser(homeId, user);
  dispatch(setNewUserToken(temp_pw));
  const { home } = await getHome(homeId);
  await dispatch(setSelectedHome(home));
};

