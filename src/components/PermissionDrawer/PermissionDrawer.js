import React from "react";
import {
    Card,
    Grid,
    Slide,
    Fade,
    CardContent,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    Tabs,
    Tab, Typography, Collapse
} from "@material-ui/core";
import BaseButton from "../BaseButton/BaseButton";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Paper from "@material-ui/core/Paper";
import { faLock, faTimes } from "@fortawesome/free-solid-svg-icons";


const useStyles = makeStyles((theme) => ({
    tabs: {
        backgroundColor: theme.palette.primary.dark,
        color: "white",
        height: 40,
    },

    card: {
        backgroundColor: theme.palette.primary.main,
        padding: 10,
        height: 600,
    },

    backdrop: {
        transition: "all 1s",
        backgroundColor: "rgba(100, 100, 100, 0)",
    },
    paper: {
        width: "100%",
        maxHeight: 360,
        overflow: "auto",
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
    },
    subtitle: {
        color: "white",
        textAlign: "center",

        fontSize: 16,
        fontWeight: 600,
    },
    helperTexts: {
        color: "white",
        fontSize: 14,
        marginBottom: 24,
    },

    goBackBtn: {
        display: "flex",
        justifyContent: "space-between",
        textTransform: "none",
        border: "none",
        width: 80,
        color: theme.palette.primary.contrastText,
    },
    drawerPaper: {
        position: "absolute",
        top: 64,
        backgroundColor: theme.palette.primary.main,
        borderLeft: "1px solid white",
    },
    list: {
        textAlign: "center",
        width: 400,
    },
    lockIcon: {
        cursor: "pointer",
        zIndex: 9000,
        left: "calc(50% - 24px)",
        color: theme.palette.primary.contrastText,
        position: "absolute",
        fontSize: 48,
        top: "40%",
    },
    disabled: {},
    hideContent: {
        backgroundColor: theme.palette.primary.dark,
        opacity: 0.4,
        pointerEvents: "none",
        height: "100%",
    },
}));

const PermissionDrawer = ({ open, permissions, roles, setPermissions, addedPermissions, setAddedPermissions, showPermissions }) => {
    const classes = useStyles();
    const [selectedItem, setSelectedItem] = React.useState({});

    const handleAdd = (perm) => {
        const removed = permissions.filter((n) => n.key !== perm.key);
        setAddedPermissions([...addedPermissions, perm.name]);
        setPermissions(removed);
        return removed.length < 1 && showPermissions(false);
    };

    return (
        <React.Fragment key="test">
            <Drawer
                BackdropProps={{
                    classes: {
                        root: classes.backdrop,
                    },
                }}
                open={open}
                PaperProps={{
                    classes: {
                        root: classes.drawerPaper,
                    },
                }}
                anchor="right"
            >
                <div className={classes.list} role="presentation">
                    <div style={{ textAlign: "center" }}>
                        <BaseButton
                            onClick={() => showPermissions(false)}
                            className={classes.goBackBtn}
                        >
                            <FontAwesomeIcon
                                style={{ marginTop: 8, fontSize: 24 }}
                                icon={faTimes}
                            />
                        </BaseButton>
                        <Typography
                            style={{ fontSize: 18, marginTop: 8, color: "white" }}
                        >
                            {" "}
            Permissions
          </Typography>
                    </div>
                    <Divider />

                    <Paper
                        style={{
                            position: "relative",
                            textAlign: "center",
                            margin: 16,
                            maxHeight: 400,
                            width: "calc(100% - 48px)",
                            padding: 8,
                        }}
                        elevation={24}
                        className={classes.paper}
                    >
                        {false ? (
                            <FontAwesomeIcon
                                className={classes.lockIcon}
                                icon={faLock}
                            ></FontAwesomeIcon>
                        ) : (
                                ""
                            )}
                        <div className={false ? classes.hideContent : ""}>
                            <List component="nav" aria-label="main mailbox folders">
                                {permissions.map((permission, i) => (
                                    <div>
                                        <ListItem
                                            onClick={() => setSelectedItem(permission)}
                                            button
                                        >
                                            <ListItemIcon>
                                                <FontAwesomeIcon
                                                    style={{ color: "white" }}
                                                    icon={permission.icon}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        style={{ color: "white", fontSize: 12 }}
                                                    >
                                                        {permission.name}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                        <Collapse
                                            timeout={1000}
                                            in={selectedItem.key === permission.key}
                                        >
                                            <div
                                                style={{
                                                    margin: 16,
                                                    position: "relative",
                                                    height: 240,
                                                }}
                                            >
                                                <Typography
                                                    style={{
                                                        color: "white",
                                                        textAlign: "left",
                                                        fontSize: 14,
                                                    }}
                                                >
                                                    {" "}
                                                    {permission.helperText}
                                                </Typography>
                                                <BaseButton
                                                    style={{
                                                        position: "absolute",
                                                        left: 0,
                                                        bottom: 10,
                                                        height: 30,
                                                        width: 200,
                                                    }}
                                                >
                                                    {" "}
                                                    {`Read more on ${permission.name}`}{" "}
                                                </BaseButton>
                                                <BaseButton
                                                    onClick={() => handleAdd(permission)}
                                                    style={{
                                                        position: "absolute",
                                                        right: 0,
                                                        bottom: 10,
                                                        width: 20,
                                                        height: 30,
                                                    }}
                                                >
                                                    {" "}
                        Add{" "}
                                                </BaseButton>
                                            </div>
                                        </Collapse>
                                        {i !== permissions.length - 1 && <Divider />}
                                    </div>
                                ))}
                            </List>
                        </div>
                    </Paper>
                    <div style={{ textAlign: "center" }}>
                        <Typography
                            style={{ fontSize: 18, marginTop: 8, color: "white" }}
                        >
                            {" "}
            Roles
          </Typography>
                    </div>
                    <Divider />
                    <Paper
                        style={{
                            margin: 16,
                            maxHeight: 400,
                            width: 400 - 48,
                            padding: 8,
                        }}
                        elevation={24}
                        className={classes.paper}
                    >
                        <List component="nav" aria-label="main mailbox folders">
                            {roles.map((role, i) => (
                                <div>
                                    <ListItem onClick={() => setSelectedItem(role)} button>
                                        <ListItemIcon>
                                            <FontAwesomeIcon
                                                style={{ color: "white" }}
                                                icon={role.icon}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Typography style={{ color: "white", fontSize: 12 }}>
                                                    {role.label}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                    <Collapse timeout={1000}
                                        in={selectedItem.key === role.key}>
                                        <div
                                            style={{
                                                margin: 16,
                                                position: "relative",
                                                height: 240,
                                            }}
                                        >
                                            <Typography
                                                style={{
                                                    color: "white",
                                                    textAlign: "left",
                                                    fontSize: 14,
                                                }}
                                            >
                                                {" "}
                                                {role.helperText}
                                            </Typography>
                                            <BaseButton
                                                style={{
                                                    position: "absolute",
                                                    left: 0,
                                                    bottom: 10,
                                                    height: 30,
                                                }}
                                            >
                                                {" "}
                                                {`Read more on ${role.name}`}{" "}
                                            </BaseButton>
                                            <BaseButton
                                                onClick={() => handleAdd(role.key)}
                                                style={{
                                                    position: "absolute",
                                                    right: 0,
                                                    bottom: 10,
                                                    width: 20,
                                                    height: 30,
                                                }}
                                            >
                                                {" "}
                      Add{" "}
                                            </BaseButton>
                                        </div>
                                    </Collapse>
                                    {i !== roles.length - 1 && <Divider />}
                                </div>
                            ))}
                        </List>
                    </Paper>
                </div>
            </Drawer>
        </React.Fragment>
    );
};

export default PermissionDrawer;