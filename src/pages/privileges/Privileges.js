import React from "react";
import { withStyles, Typography } from "@material-ui/core";

const styles = (theme) => ({
  title: {
    color: "white",
    fontWeight: 600,
  },
});
class Privileges extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <Typography className={classes.title} variant="h5">
        Privileges Page!
      </Typography>
    );
  }
}

export default withStyles(styles)(Privileges);
