import uiReducer from "./uiReducer";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import accountReducer from "./pages/accountsReducer";
import driveReducer from "./pages/driveReducer";
import { connectRouter } from "connected-react-router";
import consoleReducer from "./pages/consoleReducer";

const pageReducer = combineReducers({
  console: consoleReducer,
  accounts: accountReducer,
  drive: driveReducer,
});

const appReducer = (history) =>
  combineReducers({
    page_data: pageReducer,
    ui: uiReducer,
    auth: authReducer,
    router: connectRouter(history),
  });

export default appReducer;
