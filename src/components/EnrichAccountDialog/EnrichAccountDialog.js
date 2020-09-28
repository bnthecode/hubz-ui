import React from "react";
import { Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route } from "react-router";
import CreateHomeCard from "../CreateHomeCard/CreateHomeCard";
import UpdateUserProfileCard from "../UpdateUserProfileCard/UpdateUserProfileCard";
import SuccessHomeCard from "../SuccessHomeCard/SuccessHomeCard";
const useStyles = makeStyles((theme) => ({
  dialog: {
    height: "50%",
    width: "50%",
    overflowX: "hidden",
  },
  card: {
    padding: 10,
    height: "100%",
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
    backgroundColor: "rgba(100, 100, 100, 0.8)",
  },
  subtitle: {
    textAlign: "center",

    fontSize: 16,
    fontWeight: 600,
  },
}));
const EnrichAccountDialog = ({ user, match, createHome, homes }) => {
  const classes = useStyles();

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
        <Switch>
          <Route
            exact
            path={`${match.path}/create-home`}
            render={(props) => (
              <CreateHomeCard
                {...props}
                next={match.url}
              />
            )}
          />
          <Route
            exact
            path={`${match.path}/home-create-success`}
            render={(props) => (
              <SuccessHomeCard
                {...props}
                user={user}
                home={homes[0]}
                next={match.url}
              />
            )}
          />
          <Route
            exact
            path={`${match.path}/update-profile`}
            render={(props) => (
              <UpdateUserProfileCard {...props} user={user} next={match.url} />
            )}
          />
        </Switch>
      </Dialog>
    </div>
  );
};


export default EnrichAccountDialog;
