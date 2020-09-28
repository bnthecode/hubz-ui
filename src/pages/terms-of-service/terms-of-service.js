import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  landingPageContainer: {
    height: "90vh",
    backgroundColor: theme.palette.secondary.main,
  },
}));

const TermsOfService = () => {
  const classes = useStyles();
  return <div className={classes.landingPageContainer}>lots of text</div>;
};

export default TermsOfService;
