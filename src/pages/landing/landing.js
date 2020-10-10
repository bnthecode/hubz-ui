import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, Zoom, Card } from "@material-ui/core";
import LoginForm from "../../components/LoginForm/LoginForm";
import BaseButton from "../../components/BaseButton/BaseButton";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    marginTop: 10,
    width: "100%",
  },
  heading: {
    fontWeight: 600,
    color: "#fafbfc",
  },
  image: {
    height: 360,
    opacity: 0.9,
  },
  landingPageContainer: {
    height: "90vh",
    backgroundColor: theme.palette.secondary.main,
  },
  cardContent: {
    backgroundColor: "#fafbfc",
  },
  activeBtn: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    color: "white",
    backgroundColor: theme.palette.primary.main,
  },
  inactiveBtn: {
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    color: "white",
    backgroundColor: theme.palette.primary.dark,
  },
  toggleButton: {
    border: "none",
    width: "50%",
    borderRadius: "0px",
  },
  gridItemLeft: {
    marginTop: "10%",
  },
  gridItemRight: {
    marginTop: "2%",
  },
  loginCard: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Landing = ({ login, user, signUp }) => {
  const [loggingIn, setLoggingIn] = React.useState(true);

  const classes = useStyles();
  return (
    <div className={classes.landingPageContainer}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1} />
            <Grid className={classes.gridItemLeft} item xs={5}>
              <Typography className={classes.heading} variant="h3">
                Welcome to Hubz
              </Typography>
            </Grid>
            <Grid item xs={2} />
            {!user.username ? (
              <Grid className={classes.gridItemRight} item xs={3}>
                <Zoom in timeout={500}>
                  <Card elevation={24} className={classes.loginCard}>
                    <Typography
                      className={classes.heading}
                      variant="body1"
                    ></Typography>
                    <BaseButton
                      className={clsx([
                        classes.toggleButton,
                        loggingIn ? classes.activeBtn : classes.inactiveBtn,
                      ])}
                      onClick={() => setLoggingIn(true)}
                    >
                      Login
                    </BaseButton>
                    <BaseButton
                      className={clsx([
                        classes.toggleButton,
                        !loggingIn ? classes.activeBtn : classes.inactiveBtn,
                      ])}
                      onClick={() => setLoggingIn(false)}
                    >
                      Sign up
                    </BaseButton>
                    <br />
                    <LoginForm
                      loggingIn={loggingIn}
                      login={login}
                      signUp={signUp}
                    ></LoginForm>
                  </Card>
                </Zoom>
              </Grid>
            ) : (
              ""
            )}
            <Grid item xs={1} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
