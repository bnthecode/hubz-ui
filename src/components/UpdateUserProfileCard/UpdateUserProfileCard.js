import React from "react";
import {
  Card,
  Typography,
  Grid,
  Avatar,
  Slide,
  MenuItem,
  Paper,
} from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPlus,
  faCheck,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { uploadProfileImg } from "../../services/http/user-http";
import BaseSelect from "../BaseSelect/BaseSelect";
import BaseButton from "../BaseButton/BaseButton";
import BaseTextField from "../BaseTextField/BaseTextField";
const useStyles = makeStyles((theme) => ({
  dialog: {
    height: "50%",
    width: "50%",
    overflowX: "hidden",
  },
  goBackIcon: {
    marginRight: 4,
    color: theme.palette.primary.contrastText,
  },
  goBackText: {
    fontSize: 12,
    color: theme.palette.primary.contrastText,
  },

  disabled: {
    color: "yellow",
  },
  formControl: {
    width: "100%",
  },
  card: {
    backgroundColor: theme.palette.primary.light,
    padding: 10,
    height: "100%",
  },
  finishBtn: {
    color: theme.palette.primary.contrastText,
    position: "fixed",
    border: `1px solid ${theme.palette.primary.contrastText}`,
    bottom: "calc(25% + 10px)",
  },
  profileText: {
    color: theme.palette.primary.contrastText,
  },
  large: {
    width: 160,
    height: 160,
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: 600,
    color: theme.palette.primary.contrastText,
    fontSize: 20,
  },

  icon: {
    margin: 3,
    color: "#757575",
    fontSize: 140,
  },
  backdrop: {
    backgroundColor: "rgba(100, 100, 100, 0.8)",
  },
  subtitle: {
    textAlign: "center",

    fontSize: 16,
    fontWeight: 600,
  },
  helperText: {
    "&:disabled": {
      color: "white",
    },
  },
  inputButton: {
    boxShadow: "0px 12px 20px #888888",
    backgroundColor: theme.palette.primary.main,
    cursor: "pointer",
    color: theme.palette.primary.contrastText,
    position: "absolute",
    right: -5,
    top: -5,
    fontSize: 30,
  },
}));
const UpdateUserProfileCard = ({ history, user, match }) => {
  const classes = useStyles();
  const [homeData, setHomeData] = React.useState({});
  const [selectedImage, setProfileImg] = React.useState({});
  const [preview, setPreview] = React.useState();

  const handleFormField = (event, key) => {
    const {
      target: { value },
    } = event;
    setHomeData({
      ...homeData,
      [key]: value,
    });
  };
  const handleFinish = async () => {
    history.push(`/${user.username}/dashboard`);
  };

  const onChangeHandler = (event) => {
    setProfileImg(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  const onClickHandler = () => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    uploadProfileImg(formData);
  };

  return (
    <Slide in direction="left">
      <Card className={classes.card}>
        <BaseButton onClick={() => history.goBack()}>
          <FontAwesomeIcon className={classes.goBackIcon} icon={faArrowLeft} />
          <Typography className={classes.goBackText}>Go Back</Typography>
        </BaseButton>

        <Grid style={{ marginTop: "36px" }} container>
          <Grid item xs={6}>
            <Paper
              elevation={8}
              style={{
                height: 160,
                padding: 12,
                width: "75%",
                position: "relative",
                margin: 12,
                borderRadius: "20px",
              }}
            >
              <BaseButton
                className={classes.inputButton}
                component="label"
              >
                <FontAwesomeIcon icon={faPlus} />

                <input
                  onChange={onChangeHandler}
                  type="file"
                  style={{ display: "none" }}
                />
              </BaseButton>

              <Avatar
                alt="Remy Sharp"
                src={preview || ""}
                className={classes.large}
              />
            </Paper>
            <Grid item xs={12}>
              <Typography
                style={{
                  color: "#757575",
                  fontWeight: 600,
                  alignSelf: "center",
                }}
              >
                <Grid container>
                  <Grid
                    style={{ padding: 4 }}
                    item
                    xs={selectedImage.name ? 6 : 8}
                  >
                    {selectedImage.name ? (
                      <Typography
                        style={{
                          color: "#757575",
                          fontWeight: 600,
                          alignSelf: "center",
                        }}
                      >
                        <FontAwesomeIcon
                          style={{
                            fontSize: 12,
                            color: "green",
                            marginRight: 12,
                          }}
                          icon={faCheck}
                        />
                        {selectedImage.name}
                      </Typography>
                    ) : (
                      <Typography className={classes.profileText}>
                        Add a profile image
                      </Typography>
                    )}
                  </Grid>
                  {selectedImage.name ? (
                    <Grid style={{ textAlign: "center" }} item xs={6}>
                      <BaseButton
                        onClick={onClickHandler}
                      >
                        <FontAwesomeIcon
                          style={{ marginRight: 10 }}
                          icon={faUpload}
                        />
                        upload
                      </BaseButton>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.title}> Counts, Brandon </Typography>
            <Grid style={{ marginTop: 12 }} item xs={12}>
              <BaseTextField
                classes={{
                  disabled: classes.disabled,
                }}
                disabled  
                className={classes.root}
                value="@Someusername"
                id="user-name-disabled"
                label="Username"
              />
              <BaseTextField
                classes={{
                  disabled: classes.disabled,
                }}
                className={classes.root}
                FormHelperTextProps={{
                  className: classes.helperText,
                }}
         
                disabled
                value="password"
                id="user-password"
                label="Password"
              />

              <BaseSelect
                onChange={(e) => handleFormField(e, "home_type")}
                value={homeData["home_type"] || "home-admin"}
              >
                <MenuItem
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "white",
                    backgroundColor: "#757575",
                    height: 40,
                  }}
                  value="home-admin"
                >
                  Home Admin
                </MenuItem>
                <MenuItem
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "white",
                    backgroundColor: "#757575",
                    height: 40,
                  }}
                  value="secondary-resident"
                >
                  Secondary Resident
                </MenuItem>
                <MenuItem
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "white",
                    backgroundColor: "#757575",
                    height: 40,
                  }}
                  value="guest"
                >
                  Guest
                </MenuItem>
              </BaseSelect>
            </Grid>
          </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <BaseButton
            onClick={handleFinish}
            variant="outlined"
            className={classes.finishBtn}
          >
            Finish
          </BaseButton>
        </div>
      </Card>
    </Slide>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUserProfileCard);
