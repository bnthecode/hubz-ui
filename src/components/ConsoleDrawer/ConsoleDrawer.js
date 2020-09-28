import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Fade } from "@material-ui/core";
import clsx from "clsx";
import BaseButton from "../BaseButton/BaseButton";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerContainer: {
    overflow: "auto",
  },
  drawerOpen: {
    width: drawerWidth,
    position: "fixed",
    top: 58,
    left: 0,
    boxShadow: `2px 2px 16px ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    transition: theme.transitions.create("width", {
      duration: 1000,
    }),
  },
  drawerClose: {
    position: "fixed",
    top: 64,
    left: 0,
    boxShadow: `2px 2px 16px ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    transition: theme.transitions.create("width", {
      duration: 1000,
    }),
    overflow: "hidden",
    width: 0,
    [theme.breakpoints.up("sm")]: {
      width: 60,
    },
  },
  icon: {
    color: "white",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuButtonIcon: {
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    width: 10,
    border: "none",
    backgroundColor: theme.palette.primary.dark,
    position: "fixed",
    bottom: 16,
    color: theme.palette.primary.contrastText,
  },
  selected: {
    color: theme.palette.primary.contrastText,
  },
}));

const DashboardDrawer = ({
  navItems,
  selectedNavItem,
  navigateItem,
  drawerOpen,
  setDrawerOpen,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          }),
        }}
      >
        <div className={classes.drawerContainer}>
          <List style={{ overflowX: "hidden" }}>
            {navItems.map((item) => (
              <ListItem
                selected={item.path === selectedNavItem}
                classes={{
                  selected: classes.selected,
                }}
                style={{ height: 50 }}
                onClick={() => navigateItem(item.path)}
                button
                key={item.name}
              >
                <ListItemIcon>
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={clsx([
                      classes.icon,
                      item.path === selectedNavItem ? classes.selected : "",
                    ])}
                  />
                </ListItemIcon>

                {drawerOpen ? (
                  <Fade in unmountOnExit timeout={2000}>
                    <ListItemText primary={item.name} />
                  </Fade>
                ) : (
                  ""
                )}
              </ListItem>
            ))}
          </List>
          <Divider />
          <List></List>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <BaseButton
            onClick={() => setDrawerOpen(!drawerOpen)}
            className={classes.menuButtonIcon}
          >
            <FontAwesomeIcon icon={drawerOpen ? faArrowLeft : faArrowRight} />
          </BaseButton>
        </div>
      </Drawer>
    </div>
  );
};

export default DashboardDrawer;
