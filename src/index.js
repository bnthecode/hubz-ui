import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import * as serviceWorker from "./serviceWorker";
import { PersistGate } from "redux-persist/integration/react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/mui-theme";
import history from "./services/history";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";

const persistConfig = {
  key: "node-plaid",
  storage,
  whitelist: ["auth", "page_data", "ui"],
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, rootReducer(history));
export const store = createStore(
  persistedReducer,
  composeEnhancer(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
  )
);
export const persistor = persistStore(store);
// const { ui : { uiTheme } } = store.getState();
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </PersistGate>
    </ConnectedRouter>
  </Provider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
