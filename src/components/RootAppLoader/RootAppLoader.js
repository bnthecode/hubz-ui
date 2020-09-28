import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Backdrop, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    position: "absolute",
    top: 64,
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  loaderIcon: {
    position: "absolute",
    fontSize: 80,
    top: "40%",
    color: theme.palette.secondary.light,
  },
  loaderMessage: {
    position: "absolute",
    fontSize: 30,
    bottom: "40%",
    color: "white",
  },
}));

const RootAppLoader = ({ appLoading: { loading, message } }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={loading}>
      <FontAwesomeIcon className={classes.loaderIcon} icon={faSpinner} spin />
      <Typography className={classes.loaderMessage}>{message}</Typography>
    </Backdrop>
  );
};

export default RootAppLoader;
