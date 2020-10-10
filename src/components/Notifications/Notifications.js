import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { cssTransition } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  ".Toastify__progress-bar": {
    backgroundColor: "blue",
  },
  ".Toastify__progress-bar--animated": {
    backgroundColor: "blue",
  },
  ".Toastify__progress-bar--controlled": {
    backgroundColor: "blue",
  },
  ".Toastify__progress-bar--rtl": {
    backgroundColor: "blue",
  },
  ".Toastify__progress-bar--default": {
    color: "red",
  },
  ".Toastify__progress-bar--dark": {},
  toast: {
    fontSize: 12,
    borderRadius: 4,
    padding: 2,
    border: `1px solid ${theme.palette.primary.contrastText}`,
    backgroundColor: theme.palette.primary.main,
  },
}));

const Notifications = ({
  notification: { message, type },
  resetNotification,
}) => {
  const classes = useStyles();

  const Msg = () => (
    <Grid style={{ margin: 8 }} container>
      <Grid item xs={12}>
        <Typography style={{ fontSize: 14, fontWeight: 600, color: "#eee" }}>
          Message: {message.content}
        </Typography>
      </Grid>
      {message.info ? (
        <Grid item xs={12}>
          <Typography style={{ fontSize: 18, fontWeight: 700, color: "#eee" }}>
            Info: {message.info}
          </Typography>
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
  const Zoom = cssTransition({
    enter: "zoomIn",
    exit: "zoomOut",
    duration: 5000,
    appendPosition: false,
    collapse: true,
    collapseDuration: 8000,
  });

  if (message && type === "error") {
    toast(<Msg />, {
      className: classes.toast,
      transition: Zoom,
      autoClose: 5000,
      position: "bottom-right",
      onClose: resetNotification,

      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <ToastContainer
      style={{ width: "400px", padding: 10 }}
      progressClassName={classes.progress}
      autoClose={4000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
    />
  );
};

export default Notifications;
