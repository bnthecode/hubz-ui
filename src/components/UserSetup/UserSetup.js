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
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import BaseButton from "../BaseButton/BaseButton";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUser,
  faFileInvoice,
  faCalendar,
  faEdit,
  faNetworkWired,
  faUserLock,
  faHotel,
} from "@fortawesome/free-solid-svg-icons";
import Paper from "@material-ui/core/Paper";
import BaseTextField from "../BaseTextField/BaseTextField";
import strings from "./helpers/strings";
import BaseForm from "../BaseForm/BaseForm";
import PermissionDrawer from "../PermissionDrawer/PermissionDrawer";

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
  paper: {
    width: "100%",
    maxHeight: 360,
    overflow: "auto",
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
  },

  goBackBtn: {
    display: "flex",
    justifyContent: "space-between",
    textTransform: "none",
    border: "none",
    width: 80,
    color: theme.palette.primary.contrastText,
  },
  disabled: {},
}));

const UserSetup = ({ selectedHome, setContent, history, createHomeUser, new_user_setup }) => {
  const {
    drawer: {
      accountText,
      calendarText,
      myDriveText,
      invitationText,
      adminText,
      guestText,

    },
  } = strings;
  
  const classes = useStyles();
  const [userForm, setUserForm] = React.useState({});
  const [showForm, setShowForm] = React.useState(false);
  const [permissionsOpen, showPermissions] = React.useState(false);
  const [successMessage, showSuccessfulCreation] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({});
  const [step, setStep] = React.useState(1);
  const [permissions, setPermissions] = React.useState([
    {
      key: 0,
      name: accountText.name,
      label: accountText.label,
      helperText: accountText.helperText,
      icon: faFileInvoice,
    },
    {
      key: 1,
      name: calendarText.name,
      label: calendarText.label,
      helperText: calendarText.helperText,
      icon: faCalendar,
    },
    {
      key: 2,
      name: myDriveText.name,
      label: myDriveText.label,
      helperText: myDriveText.helperText,
      icon: faNetworkWired,
    },
    {
      key: 3,
      name: invitationText.name,
      label: invitationText.label,
      helperText: invitationText.helperText,
      icon: faEdit,
    },
  ]);

  const [roles, setRoles] = React.useState([
    {
      key: 5,
      name: adminText.name,
      label: adminText.label,
      helperText: adminText.helperText,
      icon: faUserLock,
    },
    {
      key: 6,
      name: guestText.name,
      label: guestText.label,
      helperText: guestText.helperText,
      icon: faHotel,
    },
  ]);
  const [addedPermissions, setAddedPermissions] = React.useState([]);
  
  const handleUserForm = (e, key) => {
    setUserForm({
      ...userForm,
      [key]: e.target.value,
    });
  };

  const handleCreateUser = async () => {
    await createHomeUser(selectedHome.id, {...userForm, permissions: addedPermissions});
    setShowForm(false);
    showSuccessfulCreation(true);
  };

  const showSteps = (currentStep) => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <BaseForm
              inputs={{
                keys: ["first_name", "last_name", "phone_number"],
              }}
              width="80%"
              spacing={16}
              handler={handleUserForm}
            />
            <BaseButton
              disabled={Object.keys(userForm).length < 2}
              onClick={() => setStep(2)}
            >
              {" "}
              Continue to permissions
            </BaseButton>
          </div>
        );
      case 2:
        return (
          <div>
            {addedPermissions.map((p) => (
              <Typography>{p}</Typography>
            ))}
            <BaseButton
              style={{ marginTop: 16 }}
              onClick={() => showPermissions(true)}
            >
              Set permissions
            </BaseButton>
            <BaseButton onClick={() => setStep(3)}> Review </BaseButton>
            
          </div>
        );
      case 3:
        return (
          <div>
            <Typography>
              Creating this user will generate a key you will send to them and
              they will log in
            </Typography>
            <BaseButton
              style={{ margin: 32 }}
              onClick={() => handleCreateUser()}
            >
              Add user
            </BaseButton>
        
          </div>
        );
    }
  };

  return (
    <Slide in direction="left">
      <Card elevation={24} className={classes.card}>
        <BaseButton
          className={classes.goBackBtn}
          onClick={() => history.goBack()}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </BaseButton>
        <CardContent style={{ padding: 24 }}>
          <Grid container>
            <Grid style={{ textAlign: "left" }} item xs={5}>
              <Paper
                style={{ height: 300, alignItems: "center" }}
                className={classes.paper}
                elevation={24}
              >
                <List component="nav" aria-label="main mailbox folders">
                  {selectedHome.home_users.map((user, i) => (
                    <div>
                      <ListItem
                        style={{
                          width: "90%",
                          margin: "auto",
                          border: "1px solid white",
                        }}
                        button
                      >
                        <ListItemIcon>
                          <FontAwesomeIcon
                            style={{ color: "white" }}
                            icon={faUser}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${user.first_name} ${user.last_name}`}
                        />
                      </ListItem>
                      {i !== selectedHome.home_users.length - 1 && <Divider />}
                    </div>
                  ))}
                </List>
              </Paper>
              <div style={{ textAlign: "center" }}>
                <BaseButton
                  onClick={() => setShowForm(true)}
                  style={{ marginTop: 16, width: 100 }}
                >
                  {" "}
                  Add{" "}
                </BaseButton>
              </div>
            </Grid>

            <Grid item xs={1}>
              <Divider style={{ marginLeft: "50%" }} orientation="vertical" />
            </Grid>
            {showForm ? (
              <Fade in timeout={1000}>
                <Grid style={{ textAlign: "center" }} item xs={6}>
                  <Paper
                    style={{ height: 300 }}
                    className={classes.paper}
                    elevation={24}
                  >
                    <Fade in timeout={1000}>
                      {showSteps(step)}
                    </Fade>
                  </Paper>
                </Grid>
              </Fade>
            ) : (
              ""
            )}
            { new_user_setup.new_user_token}
          </Grid>

          <PermissionDrawer
            addedPermissions={addedPermissions}
            setAddedPermissions={setAddedPermissions}
            showPermissions={showPermissions}
            setPermissions={setPermissions}
            open={permissionsOpen}
            permissions={permissions}
            roles={roles}
          ></PermissionDrawer>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default UserSetup;
