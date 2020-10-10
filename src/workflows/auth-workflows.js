import { setAccounts } from "../redux/actions/pages/accountActions";
import { setUserLogin, setUserLogout } from "../redux/actions/authActions";
import { setDrive } from "../redux/actions/pages/driveActions";
import { setHomes, setSelectedHome } from "../redux/actions/pages/consoleActions";
import { createUser, getUser, getUserWithAccessKey } from "../services/http/auth-http";

export const signOutWorkflow = () => async (dispatch) => {
  // Redux persist and redux connected router do not play well together
//   await dispatch(setSelectedHome({}));
//   await dispatch(setAccounts([]));
//   await dispatch(setDrive({}));
//   await dispatch(setHomes([]));
//   await dispatch(setUserLogout({}));
};

export const loginWorkflow = (loggingInUser) => async (dispatch) => {
  const user = await getUser(loggingInUser);
  await dispatch(setUserLogin(user));
  return user;
};

export const signUpWorkflow = (loggingInUser) => async (dispatch) => {
  const { access_key } = loggingInUser;
  let user;
  if (!access_key ) {
    user = await createUser(loggingInUser);
  await dispatch(setUserLogin(user));
  }
  else {
    user = await getUserWithAccessKey(loggingInUser);
  }
  await dispatch(setUserLogin(user));
  return user;
};
