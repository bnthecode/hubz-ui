import React from "react";
import {
  Card,
  Typography,
  Grid,
  Slide,
  Fade,
  CardContent,
  Divider,
  Paper,
  Avatar,
} from "@material-ui/core";
import BaseButton from "../BaseButton/BaseButton";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import {
  faArrowLeft,
  faLock,
  faLockOpen,
  faPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCapitalLetter } from "../../utilities/ui/formatters";
import BaseTextField from "../BaseTextField/BaseTextField";
const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  root: {
    width: "100%",
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.primary.contrastText,
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiList .MuiMenu-list .MuiList-padding": {
      paddingBottom: 0,
    },
  },
  card: {
    backgroundColor: theme.palette.primary.main,
    padding: 10,
    height: 600,
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: 600,
    textAlign: "center",
    color: "white",
    fontSize: 38,
  },
  icon: {
    color: theme.palette.secondary.light,

    fontSize: 200,
  },
  dropdownIcon: {
    color: theme.palette.primary.contrastText,
  },
  backdrop: {
    backgroundColor: "rgba(100, 100, 100, 0.8)",
  },
  table: {
    width: "100%",
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
  profileText: {
    position: "absolute",
    top: "25%",
    fontSize: 12,
    fontWeight: 500,
  },
  profileText2: {
    position: "absolute",
    top: "40%",
    fontSize: 12,
    fontWeight: 500,
  },
  formContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  formTitle: {
    color: "red",
  },
  formIcon: {
    fontSize: 18,

    color: theme.palette.primary.contrastText,
  },
  selected: {
    color: "red",
  },

  uploadPaper: {
    backgroundColor: theme.palette.primary.main,
    height: 160,
    padding: 12,
    width: "75%",
    position: "relative",
    margin: 12,
    borderRadius: "20px",
  },

  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  inputButton: {
    fontSize: 16,
    position: "absolute",
    bottom: 0,

    left: 0,
    width: 20,
    border: "none",
    color: theme.palette.primary.contrastText,
  },
  disabled: {},
  large: {
    height: 160,
    width: 160,
    backgroundColor: theme.palette.primary.light,
  },
}));

const ProfileSetup = ({ history, user, match, next }) => {
  const classes = useStyles();

  const [selectedImage, setProfileImg] = React.useState({});
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [preview, setPreview] = React.useState();
  const [unlocked, setUnlocked] = React.useState(false);
  const [userFormData, setUserData] = React.useState({ ...user });

  const handleUserChange = (e, key) => {
    setUserData({
      ...userFormData,
      [key]: e.target.value,
    });
  };

  const onChangeHandler = (event) => {
    setProfileImg(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  const onClickHandler = () => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    // uploadProfileImg(formData);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
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
            <Grid item xs={5} />
            <Grid item xs={7}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Profile Info" {...a11yProps(0)} />
                  <Tab label="Roles" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
            </Grid>
            <Grid container>
              <Grid item xs={5}>
                <Paper className={classes.uploadPaper} elevation={24}>
                  <Grid container>
                    <BaseButton
                      className={classes.inputButton}
                      component="label"
                    >
                      <FontAwesomeIcon icon={faPlus} />

                      <input
                        onChange={() => {}}
                        type="file"
                        style={{ display: "none" }}
                      />
                    </BaseButton>
                    <Grid item xs={7}>
                      <Avatar
                        alt="Remy Sharp"
                        src={preview || ""}
                        className={classes.large}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.profileText}>
                        {`${getCapitalLetter(
                          user.last_name
                        )}, ${getCapitalLetter(user.first_name)}`}
                      </Typography>
                      <Typography className={classes.profileText2}>
                        {`@${user.username}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Divider style={{ width: 4 }} orientation="vertical"></Divider>

              <Grid item xs={6}>
                <TabPanel value={value} index={0}>
                  <Grid container>
                    <Grid item xs={6}>
                      <BaseTextField
                        className={classes.formField}
                        label="First name"
                        disabled={!unlocked}
                        onChange={(e) => handleUserChange(e, "first_name")}
                        value={userFormData.first_name}
                        spacing={16}
                      />
                      <BaseTextField
                        disabled={!unlocked}
                        className={classes.formField}
                        label="Last name"
                        value={userFormData.last_name}
                        onChange={(e) => handleUserChange(e, "last_name")}
                        spacing={16}
                      />
                      <BaseTextField
                        disabled={!unlocked}
                        className={classes.formField}
                        label="Username"
                        value={userFormData.username || ""}
                        onChange={(e) => handleUserChange(e, "username")}
                        spacing={16}
                      />
                      <BaseTextField
                        disabled={!unlocked}
                        className={classes.formField}
                        label="Phone number"
                        value={userFormData.number}
                        onChange={(e) => handleUserChange(e, "phone")}
                        spacing={16}
                      />
                    </Grid>
                    <Grid
                      style={{ position: "relative", textAlign: "center" }}
                      item
                      xs={6}
                    >
                      <BaseButton
                        onClick={() => setUnlocked(!unlocked)}
                        style={{
                          position: "absolute",
                          top: 74,
                          left: 100,
                          width: 160,
                        }}
                      >
                        {unlocked ? "Save" : "Modify"}
                        <FontAwesomeIcon
                          style={{
                            marginLeft: 16,
                            fontWeight: 200,
                            color: "white",
                            cursor: "pointer",
                          }}
                          icon={unlocked ? faSave : faLock}
                        />
                      </BaseButton>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Roles
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default ProfileSetup;
