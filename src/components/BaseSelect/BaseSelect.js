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
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.primary.contrastText,
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiList .MuiMenu-list .MuiList-padding": {
      paddingBottom: 0,
    },
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
}));

const BaseSelect = ({ children, displayTop, spacing, className, ...props }) => {
  const classes = useStyles();
  return (
    <TextField
      InputLabelProps={{
        shrink: true,
      }}
      SelectProps={{
        classes: {
          icon: classes.icon,
        },
        MenuProps: {
          MenuListProps: {
            style: { padding: 0 },
          },
          anchorOrigin: {
            vertical: displayTop ? "top" : "bottom",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        },
      }}
      classes={{
        disabled: classes.disabled,
      }}
      style={{
        marginBottom: spacing || 0,
      }}
      margin="dense"
      className={clsx([className, classes.root])}
      variant="outlined"
      select
      {...props}
    >
      {children}
    </TextField>
  );
};

export default BaseSelect;
