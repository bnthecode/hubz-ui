import React from "react";
import {
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Grow,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import BaseButton from "../BaseButton/BaseButton";
import BaseTextField from "../BaseTextField/BaseTextField";
import { has } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
  },
  loginButton: {
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    width: "100%",
    borderRadius: 12,
  },
  helperText: {
    color: "white",
    fontWeight: 500,
    fontSize: 12,
  },

  formBottom: {
    padding: 12,
    backgroundColor: theme.palette.primary.dark,
  },
  formElement: {
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen + 2,
    }),
  },
}));
const LoginForm = ({ signUp, login, history, loggingIn }) => {
  const classes = useStyles();
  const [userFormData, setUserFormData] = React.useState({});
  const [hasKey, setHasKey] = React.useState(false);

  const handleFormField = (event, key, i) => {
    const {
      target: { value },
    } = event;
    setUserFormData({
      ...userFormData,
      [key]: value,
    });
  };

  const formFields = [
    { label: "First Name", for: "signup", key: "first_name" },

    { label: "Last Name", for: "signup", key: "last_name" },

    { label: "Username", focused: true, for: "all", key: "username" },

    { label: "Password", type: "password", for: "all", key: "password" },
  ];

  const determinePath = (user) => {
    return user.created_by ? "welcome/added-user" : "create-home/home-info";
  };

  const handleLogin = async () => {
    const user = loggingIn
      ? await login(userFormData)
      : await signUp(userFormData);
    const path = loggingIn ? "dashboard" : determinePath(user);
    history.push(`/${user.username}/${path}`);
  };

  return (
    <div>
      <Grid container>
        <Grid
          className={classes.formElement}
          style={{ height: loggingIn ? 200 : 340 }}
          item
          xs={12}
        >
          <Grid style={{ padding: 20 }} container>
            {formFields.map((field, i) => (
              <Grid item xs={12}>
                {field.for === "all" ||
                (field.for === "signup" && !loggingIn) ? (
                  <BaseTextField
                    spacing={16}
                    type={field.type || ""}
                    autoFocus={field.focused}
                    onChange={(e) => handleFormField(e, field.key, i)}
                    id={`login-${field.label}`}
                    label={field.label}
                  />
                ) : (
                  ""
                )}
              </Grid>
            ))}
            {!loggingIn && (
              <Grid container>
                <Grid item xs={3}>
                  <Typography>
                    <BaseButton
                      style={{ marginRight: 16, marginTop: 8, width: 4 }}
                      onClick={() => setHasKey(!hasKey)}
                    >
                      {hasKey && <FontAwesomeIcon icon={faCheck} />}
                    </BaseButton>
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  {!hasKey ? (
                    <Typography style={{ marginTop: 16, color: "white" }}>
                      I have been given a home access key
                    </Typography>
                  ) : (
                    <Grow in timeout={1000}>
                      <BaseTextField
                        onChange={(e) => handleFormField(e, "access_key")}
                        label="Home access key"
                        placeholder="hubz_"
                      ></BaseTextField>
                    </Grow>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.formBottom} item xs={12}>
        {!loggingIn ? (
          <Typography className={classes.helperText}>
            Please be sure that your username and password contain at least 7
            characters.
            <br />
            By clicking "Sign up" you are agree to our{" "}
            <Link className={classes.link} to="/terms-of-service">
              {" "}
              Terms of Service
            </Link>
          </Typography>
        ) : (
          <Typography className={classes.helperText}>
            Welcome back
            <br />
          </Typography>
        )}
        <br /> <br />
        <BaseButton onClick={handleLogin} className={classes.loginButton}>
          {loggingIn ? "Log in" : "Sign up"}
        </BaseButton>
      </Grid>
    </div>
  );
};

export default withRouter(LoginForm);
