import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import BaseButton from "../BaseButton/BaseButton";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    backgroundColor: "rgba(50, 50, 50, 0.5)",
  },
  paper: {
    backgroundColor: theme.palette.secondary.light,
    color: "white",
  },
  signOutBtn: {
    width: "100%",
    color: theme.palette.primary.contrastText,
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
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Typography className={classes.helperText}>
            {" "}
            This will remove any cookies you have persisted using this site.{" "}
          </Typography>
          <Typography className={classes.helperText}>
            {" "}
            Once you have signed out, you may lose progress.{" "}
          </Typography>
          <Typography className={classes.helperText}>
            {" "}
            Are you sure you want to continue?{" "}
          </Typography>
        </DialogContentText>
        <Grid container>
          <Grid item xs={4}>
            <BaseButton
              className={classes.signOutBtn}
              onClick={() => showSignOutDialog(false)}
            >

              No, take me back
            </BaseButton>
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <BaseButton className={classes.signOutBtn} onClick={signOut}>
              Yes, sign me out
            </BaseButton>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default SignOutDialog;
