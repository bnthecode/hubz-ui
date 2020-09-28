import { setAccounts } from "../redux/actions/accountActions";
import { setUserLogin, setUserLogout } from "../redux/actions/authActions";
import { setDrive } from "../redux/actions/driveActions";
import { setHomes, setSelectedHome } from "../redux/actions/uiActions";
import { createUser, getUser } from "../services/http/auth-http";
import { getHomesWorkflow } from "./home-workflow";

export const signOutWorkflow = () => async (dispatch) => {
  // Redux persist and redux connected router do not play well together
  await dispatch(setSelectedHome({}));
  await dispatch(setAccounts([]));
  await dispatch(setDrive({}));
  await dispatch(setHomes([]));
  await dispatch(setUserLogout({}));
};

export const loginWorkflow = (loggingInUser) => async (dispatch) => {
  const user = await getUser(loggingInUser);
  await dispatch(setUserLogin(user));
  dispatch(getHomesWorkflow());
  return user;
};

export const signUpWorkflow = (loggingInUser) => async (dispatch) => {
  const user = await createUser(loggingInUser);
  await dispatch(setUserLogin(user));
  return user;
};
