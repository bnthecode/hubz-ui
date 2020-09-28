import { setUserLogin, setUserLogout } from "../redux/actions/authActions";
import { createUser, getUser } from "../services/http/auth-http";
import { getHomesWorkflow } from "./home-workflow";

export const signOutWorkflow = () => async dispatch => {
    dispatch(setUserLogout({}))
}

export const loginWorkflow = (loggingInUser) => async dispatch => {
    const user = await getUser(loggingInUser);
    await dispatch(setUserLogin(user));
    dispatch(getHomesWorkflow());
    return user;
}

export const signUpWorkflow = (loggingInUser) => async dispatch => {
    const user = await createUser(loggingInUser);
    await dispatch(setUserLogin(user));
    return user;
}

