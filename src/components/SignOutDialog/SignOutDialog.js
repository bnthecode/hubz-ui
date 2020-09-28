import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Typography } from "@material-ui/core";
import BaseButton from "../BaseButton/BaseButton";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    backgroundColor: "rgba(50, 50, 50, 0.5)",
  },
  paper: {
    backgroundColor: theme.palette.primary.dark,
    border: "1px solid white",
    color: "white",
  },
  btnContainer: {
    marginTop: 24,
    display: "flex",
    justifyContent: "space-between",
  },
  btnLeft: {
    float: "left",
  },
  btnRight: {
    float: "right",
  },
  helperText: {
    color: theme.palette.secondary.main,
  },
}));
const SignOutDialog = ({
  signOut,
  showSignOutDialog,
  signOutDialogOpen,
  name,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      PaperProps={{
        elevation: 0,
        classes: {
          root: classes.paper,
        },
      }}
      BackdropProps={{
        transitionDuration: 1000,
        classes: {
          root: classes.backdrop,
        },
      }}
      onClose={() => showSignOutDialog(false)}
      open={signOutDialogOpen}
    >
      <DialogTitle id="alert-dialog-slide-title">
        {name}, are you sure you want to sign out?
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Typography className={classes.helperText}>
            This will remove any cookies you have persisted using this site.
            <br />
            Once you have signed out, you may lose progress.
            <br />
            Are you sure you want to continue?
          </Typography>
        </DialogContentText>
        <div className={classes.btnContainer}>
          <BaseButton
            className={classes.btnLeft}
            onClick={() => showSignOutDialog(false)}
          >
            No, take me back
          </BaseButton>

          <BaseButton className={classes.btnRight} onClick={signOut}>
            Yes, sign me out
          </BaseButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignOutDialog;
