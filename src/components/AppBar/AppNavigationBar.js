import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCapitalLetter } from "../../utilities/ui/formatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "../BaseButton/BaseButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 40,
  },
  customizeToolbar: {
    minHeight: 64,
  },
  title: {
    flexGrow: 1,
  },
  navButton: {
    backgroundColor: "transparent",
    fontWeight: 600,
    border: "none",
  },
  navLink: {
    textDecoration: "none",
    color: "white",
  },
}));

const AppNavigationBar = ({ user, history }) => {
  const classes = useStyles();

  const navItems = [
    { name: "Hubz", link: "/" },
    { name: "Pricing", link: "/pricing" },
    { name: "Explore", link: "/explore" },
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.customizeToolbar}>
          <Grid container>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={1} style={{ marginRight: 30 }}></Grid>
                {navItems.map((item) => (
                  <Grid item xs={2}>
                    <BaseButton className={classes.navButton}>
                      <Link className={classes.navLink} to={item.link}>
                        <Typography>{item.name}</Typography>
                      </Link>
                    </BaseButton>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={4} />
          </Grid>

          {user.username && (
            <Grid item style={{ width: 150 }}>
              <div>
                <Typography style={{ fontSize: 12, cursor: "pointer" }}>
                  <FontAwesomeIcon
                    style={{ cursor: "pointer", marginRight: 8 }}
                    icon={faUser}
                  ></FontAwesomeIcon>
                  {`${getCapitalLetter(user.last_name)}, ${getCapitalLetter(
                    user.first_name
                  )}`}
                </Typography>
              </div>
            </Grid>
          )}
          {user.username && (
            <Grid
              item
              style={{ width: 125 }}
              onClick={() => history.push(`/${user.username}/dashboard`)}
            >
              <Typography style={{ fontSize: 12, cursor: "pointer" }}>
                Back to dashboard
              </Typography>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppNavigationBar));
