import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import { connect } from "react-redux";

const styles = (theme) => ({
  title: {
    color: "white",
    fontWeight: 600,
  },
});
class Bills extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <Typography className={classes.title} variant="h5">
        Bills Page!
      </Typography>
    );
  }
}

const mapStateToProps = (state) => ({
    bills: state.page_data.bills
  });
  
  const mapDispatchToProps = {
  
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Bills));
