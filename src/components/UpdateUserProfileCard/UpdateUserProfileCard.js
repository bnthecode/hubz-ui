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
import { green } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  dialog: {
    height: 600,
    width: 600,
  },
  formControl: {
    width: "100%",
  },
  btnLeft: {
    display: "flex",
    justifyContent: "space-between",
    width: 110,
    border: "none",
  },
  btnRight: {
    width: 200,
  },
  btnContainer: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
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
    color: green[400],
    fontSize: 100,
  },
  dropdownIcon: {
    color: theme.palette.primary.contrastText,
  },
  backdrop: {
    backgroundColor: "rgba(100, 100, 100, 0.8)",
  },
  contentContainer: {
    height: "90%",
  },
  subtitle: {
    color: "white",
    textAlign: "center",

    fontSize: 16,
    fontWeight: 600,
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
        <div className={classes.contentContainer}>
          <BaseButton
            className={classes.btnLeft}
            onClick={() => history.goBack()}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <Typography variant="body2">Go Back</Typography>
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
                <BaseButton className={classes.inputButton} component="label">
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
                        <BaseButton onClick={onClickHandler}>
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
              <Typography className={classes.title}>
                {" "}
                Counts, Brandon{" "}
              </Typography>
              <Grid style={{ marginTop: 12 }} item xs={12}>
                <BaseTextField
                  spacing={16}
                  classes={{
                    disabled: classes.disabled,
                  }}
                  disabled
                  value="@Someusername"
                  id="user-name-disabled"
                  label="Username"
                />
                <BaseTextField
                  spacing={16}
                  disabled={true}
                  type="password"
                  value="password"
                  id="user-password"
                  label="Password"
                />

                <BaseSelect
                  label="Home type"
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
        </div>
        <div className={classes.btnContainer}>
          <BaseButton
            onClick={handleFinish}
            variant="outlined"
            className={classes.btnRight}
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
