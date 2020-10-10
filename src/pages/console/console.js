import React from "react";
import { Route, Switch } from "react-router-dom";
import Accounts from "../accounts/accounts";
import MyDrive from "../my-drive/my-drive";
import Privileges from "../privileges/Privileges";
import Calendar from "../calendar/calendar";
import {
  Grid,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Divider,
  withStyles,
  Fade,
} from "@material-ui/core";
import { connect } from "react-redux";
import DashboardDrawer from "../../components/ConsoleDrawer/ConsoleDrawer";
import {
  getCapitalLetter,
  truncateString,
} from "../../utilities/ui/formatters";
import SignOutDialog from "../../components/SignOutDialog/SignOutDialog";
import Dashboard from "../dashboard/dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHSquare,
  faNetworkWired,
  faCalendar,
  faUser,
  faColumns,
  faEdit,
  faFileInvoice,
  faHome,
  faSpinner,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import CreateHome from "../create-home/create-home";
import BaseSelect from "../../components/BaseSelect/BaseSelect";
import {
  initConsolePageWorkflow,
  createHomeUserWorkflow,
  selectHomeWorkflow,
  createHomeWorkflow,
} from "../../workflows/pages/console-workflow";

import consoleStyles from "./console-styles.js";
import { createAccountWorkflow } from "../../workflows/pages/account-workflow";
import { signOutWorkflow } from "../../workflows/auth-workflows";
import Bills from "../bills/bills";

class Console extends React.Component {
  state = {
    selectedNavItem: "dashboard",
    signOutDialogOpen: false,
    drawerOpen: false,
    addHomeOpen: false,
  };

  componentDidMount = async () => {
    const {
      initConsole,
      auth: { user },
    } = this.props;
    this.setState({
      selectedNavItem: this.getNavItem(),
    });
    await initConsole(user);
  };

  updateLoading = (key, value) =>
    this.setState({ loading: { ...this.state.loading, [key]: value } });

  getNavItem = () => {
    const { history } = this.props;
    const pathSplit = history.location.pathname.split("/");
    return pathSplit[pathSplit.length - 1];
  };

  showAddHomeDialog = () => {
    const { addHomeOpen } = this.state;
    this.setState({ addHomeOpen: !addHomeOpen });
  };

  showSignOutDialog = () => {
    const { signOutDialogOpen } = this.state;
    this.setState({ signOutDialogOpen: !signOutDialogOpen });
  };

  navItems = [
    { name: "Dashboard", icon: faColumns, path: "dashboard", key: "1" },
    { name: "Accounts", icon: faFileInvoice, path: "accounts", key: "2" },
    { name: "My-Drive", icon: faNetworkWired, path: "my-drive", key: "3" },
    { name: "Privileges", icon: faEdit, path: "privileges", key: "4" },
    { name: "Calendar", icon: faCalendar, path: "calendar", key: "5" },
    { name: "Bills", icon: faMoneyBill, path: "bills", key: "6" },
  ];

  navigateItem = (path) => {
    const { match, history } = this.props;
    this.setState({ selectedNavItem: path });
    history.push(`/${match.params.username}/${path}`);
  };

  setDrawerOpen = () => {
    const { drawerOpen } = this.state;
    this.setState({ drawerOpen: !drawerOpen });
  };

  handleSignOut = () => {
    const { signUserOut, history } = this.props;
    return [signUserOut(), history.push("/")];
  };
  handleHomeChange = ({ target: { value } }) => {
    const { selectHome } = this.props;
    return value !== "add_home" ? selectHome(value) : this.showAddHomeDialog();
  };

  render() {
    const { selectedNavItem, signOutDialogOpen, drawerOpen } = this.state;
    const {
      console,
      auth,
      ui,
      history,
      signOut,
      createHome,
      createHomeUser,
      match,
      classes,
    } = this.props;
    const { homes, selectedHome, create_home_data } = console;
    const {
      appLoading: { loading: rootLoading },
    } = ui;
    const { user } = auth;
    return (
      <Grid className={classes.dashboardContainer}>
        <AppBar elevation={4} className={classes.appBar} position="fixed">
          <Toolbar className={classes.customizeToolbar}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <FontAwesomeIcon
                onClick={() => history.push("/")}
                icon={faHSquare}
              />
            </IconButton>

            <Grid item xs={3}>
              {homes.length ? (
                <Fade in timeout={1000}>
                  <BaseSelect
                    className={classes.homeSelect}
                    value={selectedHome.id || ""}
                    onChange={this.handleHomeChange}
                    label="Connected Homes"
                  >
                    {/* stick the first menu item here and render the rest so only one icon is loaded */}
                    <MenuItem value={selectedHome.id}>
                      {rootLoading ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          spin
                          className={classes.homeLoader}
                        />
                      ) : (
                        selectedHome.home_name
                      )}
                    </MenuItem>
                    {homes
                      .filter((n) => n.id !== selectedHome.id)
                      .map((home) => (
                        <MenuItem value={home.id}> {home.home_name}</MenuItem>
                      ))}
                    <Divider></Divider>
                    {!rootLoading ? (
                      <MenuItem value="add_home">
                        <FontAwesomeIcon
                          style={{ marginRight: 8 }}
                          icon={faHome}
                        />
                        Add another home
                      </MenuItem>
                    ) : (
                      <FontAwesomeIcon icon={faSpinner} spin size="lg" />
                    )}
                  </BaseSelect>
                </Fade>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={8}></Grid>
            <Grid
              item
              style={{ width: 200 }}
              onClick={() => history.push(`/${user.username}/dashboard`)}
            >
              <div>
                <Typography style={{ fontSize: 12, cursor: "pointer" }}>
                  <FontAwesomeIcon
                    style={{ cursor: "pointer", marginRight: 8 }}
                    icon={faUser}
                  ></FontAwesomeIcon>
                  {truncateString(
                    `${getCapitalLetter(user.last_name)}, ${getCapitalLetter(
                      user.first_name
                    )}`,
                    15
                  )}
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              style={{ width: 60 }}
              onClick={() => this.showSignOutDialog(true)}
            >
              <Typography style={{ fontSize: 12, cursor: "pointer" }}>
                Sign out
              </Typography>
            </Grid>
          </Toolbar>
        </AppBar>
        <DashboardDrawer
          selectedNavItem={selectedNavItem}
          navigateItem={this.navigateItem}
          navItems={this.navItems}
          drawerOpen={drawerOpen}
          setDrawerOpen={this.setDrawerOpen}
        />
        <div
          style={{
            marginTop: 10,
            width: `calc(100% - ${drawerOpen ? "200px" : "20px"}`,
            transition: `all ${drawerOpen ? "1s" : "1.5s"}`,
            marginLeft: drawerOpen ? 190 : 10,
          }}
        >
          <Switch>
            <Route
              path={`/${match.params.username}/create-home`}
              render={(props) => (
                <CreateHome
                  create_home_data={create_home_data}
                  createHome={createHome}
                  createHomeUser={createHomeUser}
                  user={user}
                  homes={homes}
                  selectedHome={selectedHome}
                  {...props}
                />
              )}
            />
            <Route
              path={`/${match.params.username}/welcome/added-user`}
              render={(props) => (
                <div>
                  <h2>
                    Welcome, you have been added by{" "}
                    {
                      selectedHome.home_users.find(
                        (n) => n._id === user.created_by
                      ).first_name
                    }
                  </h2>
                </div>
              )}
            />
            <Route
              exact
              path={`/${match.params.username}/dashboard`}
              render={(props) => <Dashboard home={selectedHome} {...props} />}
            />
            <Route
              exact
              path={`/${match.params.username}/accounts`}
              render={(props) => (
                <Accounts rootLoading={rootLoading} {...props} />
              )}
            />
            <Route
              exact
              path={`/${match.params.username}/my-drive`}
              render={(props) => (
                <MyDrive rootLoading={rootLoading} {...props} />
              )}
            />
            <Route
              exact
              path={`/${match.params.username}/privileges`}
              render={(props) => <Privileges rootLoading={rootLoading} {...props} />}
            />
            <Route
              exact
              path={`/${match.params.username}/calendar`}
              render={(props) => <Calendar drawerOpen={drawerOpen} rootLoading={rootLoading} {...props} />}
            />
            <Route
              exact
              path={`/${match.params.username}/bills`}
              render={(props) => <Bills rootLoading={rootLoading} {...props} />}
            />
          </Switch>
        </div>
        <SignOutDialog
          name={user.first_name}
          signOutDialogOpen={signOutDialogOpen}
          showSignOutDialog={this.showSignOutDialog}
          signOut={signOut}
        />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  ui: state.ui,
  console: state.page_data.console,
  accounts: state.page_data.accounts,
  drive: state.page_data.drive,
});

const mapDispatchToProps = {
  initConsole: initConsolePageWorkflow,
  selectHome: selectHomeWorkflow,
  createHome: createHomeWorkflow,
  createHomeUser: createHomeUserWorkflow,
  createAccount: createAccountWorkflow,
  signOut: signOutWorkflow,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(consoleStyles)(Console));
