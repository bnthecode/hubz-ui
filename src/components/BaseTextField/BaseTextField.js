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
            color: "white",
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

const BaseTextField = ({ className, spacing, ...props}) => {
    const classes = useStyles();
    return (
        <TextField
            InputLabelProps={{
                shrink: true,
            }}
            style={{
                marginBottom: spacing || 0
            }}
            className={clsx([className, classes.root, ])}
            margin="dense"
            id="outlined-basic"
            variant="outlined"
            {...props}
        />
    );
};

export default BaseTextField;
