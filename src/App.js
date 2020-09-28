import React from "react";
import {
  Router,
  BrowserRouter,
  Redirect,
  Route,
  withRouter,
} from "react-router-dom";
import history from "./services/history";
import { connect } from "react-redux";
import Notifications from "./components/Notifications/Notifications";
import Console from "./pages/console/console";
import TermsOfService from "./pages/terms-of-service/terms-of-service";
import AppNavigationBar from "./components/AppBar/AppNavigationBar";
import Pricing from "./pages/pricing/pricing";
import Explore from "./pages/explore/explore";
import About from "./pages/about/about";
import Landing from "./pages/landing/landing";
import { loginWorkflow, signUpWorkflow } from "./workflows/auth-workflows";
import { clearNotification } from "./redux/actions/uiActions";
import RootAppLoader from "./components/RootAppLoader/RootAppLoader";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const { token } = user;
  // const isOnConsole = computedMatch.params.username === user.username;
  return (
    <Route
      {...rest}
      render={(props) =>
        token && token.length ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const App = ({ user, login, signUp, ui, resetNotification }) => {
  return (
    <div style={{ backgroundColor: "#eee", height: "100vh" }}>
      <Router history={history}>
        <BrowserRouter>
          <AppNavigationBar />
          <Route
            exact
            path="/"
            render={(props) => (
              <Landing {...props} user={user} login={login} signUp={signUp} />
            )}
          />
          <Route exact path="/about" component={About} />
          <Route exact path="/pricing" component={Pricing} />
          <Route exact path="/explore" component={Explore} />
          <Route exact path="/terms-of-service" component={TermsOfService} />
          <PrivateRoute
            user={user}
            path="/:username/:page"
            component={Console}
          />
        </BrowserRouter>
      </Router>
      <Notifications
        notification={ui.notification}
        resetNotification={resetNotification}
      />
      <RootAppLoader appLoading={ui.appLoading} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  ui: state.ui,
  user: state.auth.user,
  router: state.router,
});

const mapDispatchToProps = {
  login: loginWorkflow,
  signUp: signUpWorkflow,
  resetNotification: clearNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
