import axios from "axios";
import config from "../../config";
import { store } from "../../index";
import { setNotification } from "../../redux/actions/uiActions";

const { node_api_base_url } = config;
const baseErrorMessage = {
  content: "Unkown error has occured",
  info: "",
};

const buildErrorObject = (apiError, error) => ({
  ...(apiError
    ? apiError.message || { ...baseErrorMessage, info: error.message }
    : { ...baseErrorMessage, info: error.message }),
});

const setNotificationObj = (err, type) => {
  store.dispatch(setNotification({ message: { ...err }, type }));
};

const handleError = (error) => {
  // server can respond with multiple errors
  // capturing unexpected errors, timeouts in err.message
  // capturing apiErrors in error.response.data.message
  const { response = {} } = error;
  const apiError = response && response.data;
  const validationErrors =
    apiError && apiError.messages ? apiError.messages : [];
  return validationErrors.length
    ? validationErrors.map((err) => setNotificationObj(err, "error"))
    : setNotificationObj(buildErrorObject(apiError, error), "error");
};

const httpConfig = axios.create({
  timeout: 10000,
  withCredentials: true,
});

httpConfig.interceptors.request.use((req) => {
  const {
    auth: {
      user: { token },
    },
  } = store.getState();
  req.baseURL = node_api_base_url;
  req.headers = {
    ...req.headers,
    Authorization: `Bearer ${token}`,
  };
  return req;
});

httpConfig.interceptors.response.use(
  (response) => {
    // we can determine to display from server, if message, display
    // all methods have a message back atm
    return response;
  },
  (error) => {
    handleError(error);
    throw error;
  }
);

export default httpConfig;
