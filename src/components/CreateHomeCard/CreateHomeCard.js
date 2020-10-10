import React from "react";
import {
  Card,
  Typography,
  Grid,
  Slide,
  MenuItem,
  Fade,
  CardContent,
  Divider,
} from "@material-ui/core";
import BaseSelect from "../BaseSelect/BaseSelect";
import BaseTextField from "../BaseTextField/BaseTextField";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import BaseButton from "../BaseButton/BaseButton";
import { getCapitalLetter } from "../../utilities/ui/formatters";
import { Link } from "react-router-dom";

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

  formField: {
    width: 240,
  },

  nextBtn: {
    marginTop: 8,
    width: 60,
  },
  helperTextLink: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
  },
  formContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  formIcon: {
    fontSize: 24,
    marginTop: 8,
    marginLeft: 18,
    color: theme.palette.primary.contrastText,
  },
}));
const CreateHomeCard = ({ history, next, user, createHome }) => {
  const classes = useStyles();
  const [homeData, setHomeData] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [step, setSteps] = React.useState(1);
  const [formHelperText, setHelperText] = React.useState("");

  const homeTypeHelperText = {
    family:
      "This type of home is for families looking to manage finances, utility accounts, important documents, and other shared info.",
  };

  const handleFormField = (event, key) => {
    const {
      target: { value },
    } = event;
    setHelperText(homeTypeHelperText[value] || "");
    setHomeData({
      ...homeData,
      [key]: value,
    });
  };

  const handleHomeCreation = async () => {
    await createHome(homeData);
    history.push(`${next}/home-create-success`);
  };

  const formSteps = [
    {
      label: "First, let's add the name of your home.",
      step: 1,
      key: "home_name",
      formField: (
        <BaseTextField
          // disabled={step > 1}
          spacing={16}
          className={classes.formField}
          onChange={(e) => handleFormField(e, "home_name")}
          id="create_home_name"
          placeholder={`${getCapitalLetter(user.first_name)}'s Home`}
        />
      ),
    },
    {
      label: "Now you can create a password for this home.",
      step: 2,
      key: "home_password",
      formField: (
        <BaseTextField
          // disabled={step > 2}
          spacing={16}
          className={classes.formField}
          onChange={(e) => handleFormField(e, "home_password")}
          InputProps={{
            endAdornment: (
              <FontAwesomeIcon
                onClick={() => setShowPassword(!showPassword)}
                style={{ color: "white", cursor: "pointer" }}
                icon={showPassword ? faEye : faEyeSlash}
              />
            ),
          }}
          type={showPassword ? "text" : "password"}
          form_key="home_password"
          id="create_home_password"
        />
      ),
    },
    {
      label: "Finally, just choose what type of home this is.",
      step: 3,
      key: "home_type",

      formField: (
        <BaseSelect
          className={classes.formField}
          // disabled={step > 3}
          spacing={16}
          // for the last item in the list
          onChange={(e) => [
            handleFormField(e, "home_type"),
            setSteps(step < 4 ? step + 1 : 4),
          ]}
          margin="dense"
          variant="outlined"
          value={homeData.home_type}
        >
          <MenuItem value="family"> Family </MenuItem>
          <MenuItem value="shared"> Shared </MenuItem>
          <MenuItem value="rental"> Rental Home </MenuItem>
        </BaseSelect>
      ),
    },
  ];
  const renderedFields = formSteps.filter(
    (formItem) => formItem.step < step || formItem.step === step
  );
  const helperTexts = [
    "With the creation of your home you will able to manage documents, accounts, calendars, and so much more.",
    "Here at Hubz, we provide an easy way to connect your important information in one safe place.",
    "Add other household members to your home, and set their privileges from the privileges tab.",
    "Add documents, images, or other items to share across your home.",
    "It is finally made simple to share tasks between household members, along with account information, if you choose.",
  ];
  return (
    <Slide in direction="left">
      <Card elevation={24} className={classes.card}>
        <CardContent style={{ padding: 24 }}>
          <Grid style={{ marginTop: "36px" }} container>
            <Grid item xs={5}>
              {renderedFields.map((field) => (
                <Fade in timeout={2000}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography className={classes.formTitle}>
                        {field.label}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      {field.formField}
                    </Grid>
                    {step > field.step && homeData[field.key] ? (
                      <Fade in timeout={1000}>
                        <FontAwesomeIcon
                          className={classes.formIcon}
                          icon={faCheck}
                        ></FontAwesomeIcon>
                      </Fade>
                    ) : (
                      ""
                    )}
                    {step === field.step &&
                    homeData[field.key] &&
                    step !== formSteps.length ? (
                      <Fade in timeout={500}>
                        <Grid item xs={2}>
                          <BaseButton
                            className={classes.nextBtn}
                            onClick={() => setSteps(step + 1)}
                          >
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                          </BaseButton>
                        </Grid>
                      </Fade>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Fade>
              ))}
              <Typography className={classes.helperTexts}>
                {" "}
                {formHelperText || ""}{" "}
              </Typography>
              {step === formSteps.length + 1 &&
              Object.keys(homeData).length === formSteps.length ? (
                <Fade in timeout={1000}>
                  <BaseButton
                    onClick={handleHomeCreation}
                    className={classes.createHomeBtn}
                  >
                    Create your home
                  </BaseButton>
                </Fade>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={1}>
              <Divider variant="vertical"></Divider>
            </Grid>
            <Grid item xs={6}>
              {helperTexts.map((text, i) => (
                <div>
                  <Fade in timeout={i * 1000}>
                    <Typography className={classes.helperTexts}>
                      {text}
                    </Typography>
                  </Fade>
                </div>
              ))}

              <Typography></Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Typography
          style={{
            color: "white",
            position: "absolute",
            right: "10%",
            bottom: "10%",
          }}
        >
          Questions? You can visit our documentation
          <Link className={classes.helperTextLink} to="/documentation">
            {" "}
            here
          </Link>
        </Typography>
      </Card>
      {/* { formHelperText } */}
    </Slide>
  );
};

export default CreateHomeCard;
