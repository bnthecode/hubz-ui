
import uiReducer from "./uiReducer";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import accountReducer from "./accountsReducer";
import driveReducer from "./driveReducer";
import { connectRouter } from 'connected-react-router'


const pageReducer = combineReducers({
    accounts: accountReducer,
    drive: driveReducer,
})

const appReducer = (history) => combineReducers({
  page_data: pageReducer,
  ui: uiReducer,
  auth: authReducer,
  router: connectRouter(history)
});



export default appReducer;
