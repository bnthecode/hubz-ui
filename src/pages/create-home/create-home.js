import React from "react";
import {
  AppBar,
  Dialog,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route } from "react-router";
import CreateHomeCard from "../../components/CreateHomeCard/CreateHomeCard";
import SuccessHomeCard from "../../components/SuccessHomeCard/SuccessHomeCard";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHSquare } from "@fortawesome/free-solid-svg-icons";
import { green } from "@material-ui/core/colors";
import ProfileSetup from "../../components/ProfileSetup/ProfileSetup";
import UserSetup from "../../components/UserSetup/UserSetup";
const useStyles = makeStyles((theme) => ({
  dialog: {
    height: 600,
    minWidth: 1000,
    overflowX: "hidden",
    border: "1px solid white",
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: 600,
    textAlign: "center",

    fontSize: 38,
  },
  icon: {
    fontSize: 200,
  },
  backdrop: {
    // backgroundColor: "rgba(69, 90, 100, 0.8)",
    backgroundColor: "rgb(55, 71, 79, 0.8)",
  },
  subtitle: {
    textAlign: "center",

    fontSize: 16,
    fontWeight: 600,
  },
}));

const determineHeader = (path) => {
  const totalPath = path.split("/");
  const lastItem = totalPath[totalPath.length - 1];
  switch (lastItem) {
    case "home-info":
      return "Create your home";
    case "home-create-success":
      return (
        <Typography>
          Successfully created{" "}
          <FontAwesomeIcon
            style={{ marginLeft: 8, color: green[400] }}
            icon={faCheck}
          />
        </Typography>
      );
    case "home-update-profile":
      return "Create your profile";
    case "profile-setup":
      return "Update profile";
    default:
      return "";
  }
};

const HelperContent = ({ content }) => {
  const classes = useStyles();
  return <Grid>{content}</Grid>;
};

const CreateHome = ({
  user,
  match,
  selectedHome,
  createHomeUser,
  history,
  createHome,
  homes,
  create_home_data,
}) => {

  const {
    profile_setup,
    create_home_success,
    new_user_setup,
  } = create_home_data;

  const classes = useStyles();
  const [content, setContent] = React.useState("");
  return (
    <div>
      <Dialog
        BackdropProps={{
          transitionDuration: 2000,
          classes: {
            root: classes.backdrop,
          },
        }}
        classes={{
          paper: classes.dialog,
        }}
        open
      >
        <AppBar elevation={0} position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <FontAwesomeIcon style={{ marginRight: 16 }} icon={faHSquare} />
              <Typography>
                {determineHeader(history.location.pathname)}
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route
            exact
            path={`${match.path}/home-info`}
            render={(props) => (
              <CreateHomeCard
                {...props}
                user={user}
                next={match.url}
                createHome={createHome}
              />
            )}
          />
          <Route
            exact
            path={`${match.path}/home-create-success`}
            render={(props) => (
              <SuccessHomeCard
                {...props}
                create_home_success={create_home_success}
                user={user}
                home={homes[0]}
                next={match.url}
              />
            )}
          />
          <Route
            exact
            path={`${match.path}/profile-setup`}
            render={(props) => (
              <ProfileSetup profile_setup={profile_setup} user={user} next={match.url} {...props} />
            )}
          />
          <Route
            exact
            path={`${match.path}/user-setup`}
            render={(props) => (
              <UserSetup
                new_user_setup={new_user_setup}
                setContent={setContent}
                createHomeUser={createHomeUser}
                selectedHome={selectedHome}
                user={user}
                next={match.url}
                {...props}
              />
            )}
          />
        </Switch>
      </Dialog>
      <HelperContent content={content} />
    </div>
  );
};

export default CreateHome;
