import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    marginTop: 10,
    width: "100%",
  },
  heading: {
    fontWeight: 600,
    color: "#fafbfc",
  },
  image: {
    height: 360,
    opacity: 0.9,
  },
  landingPageContainer: {
    height: "90vh",
    backgroundColor: theme.palette.secondary.main,
  },
  cardContent: {
    backgroundColor: "#fafbfc",
  },
  gridItemLeft: {
    marginTop: "10%",
  },
  gridItemRight: {
    marginTop: "2%",
  },
}));

const Pricing = () => {
  const classes = useStyles();
  return (
    <div className={classes.landingPageContainer}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1} />
            <Grid className={classes.gridItemLeft} item xs={5}>
              <Typography className={classes.heading} variant="h3">
                Hubz pricing
              </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid className={classes.gridItemRight} item xs={3}></Grid>
            <Grid item xs={1} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Pricing;
