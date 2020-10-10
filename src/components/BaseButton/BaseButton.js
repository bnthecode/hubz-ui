import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:disabled": {
      color: theme.palette.primary.dark,
    },
    textTransform: "none",
    height: 40,
    width: 180,
    color: "white",
    border: `1px solid ${theme.palette.primary.contrastText}`,
  },
}));

const BaseButton = ({ className, children, ...props }) => {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      className={clsx([className, classes.root])}
      {...props}
    >
      {children}
    </Button>
  );
};

export default BaseButton;
