import React from "react";
import {
  withStyles,
  Typography,
  Grid,
  Badge,
  Zoom,
  Slide,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCog,
  faEdit,
  faFileInvoice,
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    margin: 20,
    padding: 8,
    height: 200,
    borderRadius: "20px",
    width: 140,
    transition: "all .5s",
    cursor: "pointer",
    position: "relative",
  },
  icon: {
    fontSize: 60,
    color: "white",
  },
  selectedIcon: {
    fontSize: 60,
    color: theme.palette.primary.contrastText,
  },
  cardTitle: {
    color: "white",
    fontWeight: 600,
  },
  container: {
    transition: "translate .5s",
  },
  hoverClass: {
    height: 400,
    width: 400,
  },
  notification: {
    color: "white",
  },
  title: {
    color: "white",
    fontWeight: 600,
  },
});
class Dashboard extends React.Component {
  state = {
    hoveringItem: "",
  };

  dashboardItems = [
    { name: "Accounts", icon: faFileInvoice, path: "accounts", key: "2" },
    { name: "My-Drive", icon: faNetworkWired, path: "my-drive", key: "3" },
    { name: "Privileges", icon: faEdit, path: "Privileges", key: "4" },
    { name: "Calendar", icon: faCalendar, path: "calendar", key: "5" },
    { name: "Settings", icon: faCog, path: "settings", key: "6" },
  ];
  fillInCardInfo = (item) => {
    const { classes } = this.props;
    return (
      <Zoom unmountOnExit in timeout={500}>
        <Typography className={classes.cardTitle}>
          Here's some info about {item}
        </Typography>
      </Zoom>
    );
  };
  buildDashboardItems = () => {
    const { classes } = this.props;
    const { hoveringItem } = this.state;
    return this.dashboardItems.map((item, i) => (
      <Slide in direction="top" timeout={i * 250}>
        <Grid item>
          <Card
            onClick={() =>
              this.setState({
                hoveringItem: hoveringItem === item.name ? "" : item.name,
              })
            }
            classes={{
              root: clsx([
                classes.root,
                hoveringItem === item.name ? classes.hoverClass : "",
              ]),
            }}
          >
            <CardMedia style={{ textAlign: "center" }}>
              <Badge
                classes={{
                  badge: classes.notification,
                }}
                color="secondary"
                overlap="circle"
                badgeContent="2"
              >
                <FontAwesomeIcon
                  className={
                    hoveringItem === item.name
                      ? classes.selectedIcon
                      : classes.icon
                  }
                  icon={item.icon}
                />
              </Badge>
            </CardMedia>
            <CardContent style={{ textAlign: "center" }}>
              <Typography className={classes.cardTitle}>{item.name}</Typography>
              {hoveringItem === item.name && this.fillInCardInfo(item.name)}
            </CardContent>
          </Card>
        </Grid>
      </Slide>
    ));
  };

  render() {
    return <Grid container>{this.buildDashboardItems()}</Grid>;
  }
}

export default withStyles(styles)(Dashboard);
