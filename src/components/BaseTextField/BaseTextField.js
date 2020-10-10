import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.primary.main,

    "& .MuiOutlinedInput-input": {
      color: "white",
      "&$disabled": {
        color: theme.palette.primary.light,
      },
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.primary.contrastText,
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      "&$disabled": {
        borderColor: theme.palette.primary.dark,
      },

      borderColor: "white",
    },
    "& .MuiList .MuiMenu-list .MuiList-padding": {
      "&$disabled": {
        color: "orange",
      },
      paddingBottom: 0,
    },
  },
  disabled: {},
}));

const BaseTextField = ({ className, spacing, ...props }) => {
  const classes = useStyles();
  return (
    <TextField
      InputLabelProps={{
        shrink: true,
        classes: {
          disabled: classes.disabled,
        },
      }}
      style={{
        marginBottom: spacing || 0,
      }}
      InputProps={{
        classes: {
          disabled: classes.disabled,
        },
      }}
  
      className={clsx([className, classes.root])}
      margin="dense"
      id="outlined-basic"
      variant="outlined"
      {...props}
    />
  );
};

export default BaseTextField;
