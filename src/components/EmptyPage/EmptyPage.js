import { makeStyles, Paper, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "12.5%",
    left: "12.5%",
    width: "75%",
    height: "75%",
    backgroundColor: "transparent",
    textAlign: "center",
    color: "white",
  },
  title: {
    position: "relative",
    top: "20%",
    fontWeight: 600,
    fontSize: 36,
  },
  info: {
    position: "relative",
    top: "20%",
    fontWeight: 600,
    fontSize: 24,
  },
  baseLayout: {
    position: "relative",
    top: "20%",
  },
  contentWrapper: {
    marginTop: 20,
    backgroundColor: "transparent",
    left: "12.5%",
    top: "20%",
    width: "75%",
    height: "50%",
    border: `1px solid ${theme.palette.primary.contrastText}`,
  },
}));
const EmptyPage = ({ title, info, children }) => {
  const classes = useStyles();
  return (
    <Paper elevation={24} className={classes.paper}>
      <Typography className={clsx([classes.baseLayout, classes.title])}>
        {title}
      </Typography>
      <Typography className={clsx([classes.baseLayout, classes.info])}>
        {info}
      </Typography>
      {children && (
        <Paper
          elevation={24}
          className={clsx([classes.baseLayout, classes.contentWrapper])}
        >
          {children}
        </Paper>
      )}
    </Paper>
  );
};

export default EmptyPage;
