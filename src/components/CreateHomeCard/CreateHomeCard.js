import React from "react";
import {
  Card,
  Typography,
  Grid,
  Slide,
  MenuItem,
} from "@material-ui/core";
import BaseSelect from '../BaseSelect/BaseSelect';
import BaseTextField from '../BaseTextField/BaseTextField';
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "../BaseButton/BaseButton";

const useStyles = makeStyles((theme) => ({
  dialog: {
    height: 600,
    width: 600,
  },
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
    color: 'white',
    fontSize: 38,
  },
  icon: {
    color: theme.palette.primary.main,

    fontSize: 200,
  },
  dropdownIcon: {
    color: theme.palette.primary.contrastText,
  },
  backdrop: {
    backgroundColor: "rgba(100, 100, 100, 0.8)",
  },
  subtitle: {
    color: 'white',
    textAlign: "center",

    fontSize: 16,
    fontWeight: 600,
  },
  createHomeBtn: {
    position: "fixed",
    width: 200,
    bottom: "calc(25% + 10px)",
  },
}));
const CreateHomeCard = ({ history, next }) => {
  const classes = useStyles();
  const [homeData, setHomeData] = React.useState({ home_type: 'family' });
  const [showPassword, setShowPassword] = React.useState(false);


  const handleFormField = (event, key) => {
    const {
      target: { value },
    } = event;
    setHomeData({
      ...homeData,
      [key]: value,
    });
  };
  const handleHomeCreation = async () => {
    history.push(`${next}/home-create-success`);
  };

  return (
    <Slide in direction="left">
      <Card className={classes.card}>
        <Typography className={classes.subtitle}>
          Create your home
        </Typography>
        <Grid style={{ marginTop: "36px" }} container>
          <Grid item xs={6}>
            <FontAwesomeIcon className={classes.icon} icon={faHome} />
          </Grid>
          <Grid item xs={6}>
            <BaseTextField
              spacing={16}
              placeholder="Home name"
              autoFocus={true}
              onChange={(e) => handleFormField(e, "home_name")}
              id="create_home_name"
              label="Home name"
            />
            <BaseTextField
              spacing={16}
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
              onChange={(e) => handleFormField(e, "home_password")}
              id="create_home_password"
              label="Home password"

            />

            <BaseSelect
              spacing={16}
              onChange={(e) => handleFormField(e, "home_type")}
              margin="dense"
              variant="outlined"
              label="Home type"
              value={homeData.home_type}
            >
              <MenuItem

                value="family"
              >
                Family
              </MenuItem>
              <MenuItem

                value="shared"
              >
                Shared
              </MenuItem>
              <MenuItem

                value="rental"
              >
                Rental Home
              </MenuItem>
            </BaseSelect>
          </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <BaseButton
            disabled={Object.keys(homeData).length < 3}
            onClick={handleHomeCreation}
            className={classes.createHomeBtn}
          >
            next
          </BaseButton>
        </div>
      </Card>
    </Slide>
  );
};

export default CreateHomeCard;
