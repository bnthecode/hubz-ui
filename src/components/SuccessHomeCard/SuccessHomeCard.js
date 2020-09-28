import React from "react";
import { Card, Typography, Grid, Slide } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import BaseButton from "../BaseButton/BaseButton";
const useStyles = makeStyles((theme) => ({
  dialog: {
    height: "50%",
    width: "50%",
  },
  displayName: {
    fontSize: 16,
    fontWeight: 600,
  },
  card: {
    backgroundColor: theme.palette.primary.light,
    padding: 10,
    height: "100%",
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: 600,
    textAlign: "center",
    color: theme.palette.primary.contrastText,
    fontSize: 38,
  },
  icon: {
    color: theme.palette.primary.contrastText,
    fontSize: 40,
  },
  backdrop: {
    backgroundColor: "rgba(100, 100, 100, 0.8)",
  },
  userIcon: {
    fontSize: 40,
    color: "#757575",
  },
  homeIcon: {
    opacity: 1,
    fontSize: 40,
    color: "#757575",
  },
  subtitle: {
    textAlign: "center",
    color: theme.palette.primary.contrastText,
    fontSize: 16,
    fontWeight: 600,
  },
  formBtn: {
    color: theme.palette.primary.contrastText,
    position: "fixed",
    border: `1px solid ${theme.palette.primary.contrastText}`,
    bottom: "calc(25% + 10px)",
  },
}));
const SuccessHomeCard = ({ history, next, user }) => {
  const classes = useStyles();

  const goToDashboard = async () => {
    history.push(`/${user.username}/dashboard`);
  };
  const setUpProfile = async () => {
    history.push(`${next}/update-profile`);
  };

  return (
    <Slide in direction="left">
      <Card className={classes.card}>
        <Typography className={classes.title}>
          {" "}
          <FontAwesomeIcon
            className={classes.icon}
            icon={faCheck}
          /> Success!{" "}
        </Typography>
        <Typography className={classes.subtitle}> Set up profile </Typography>
        <Grid style={{ height: 260 }} container>
          <Typography className={classes.subtitle}>
            {" "}
            really struggling here...? WHAT DO I PUT{" "}
          </Typography>
          <Grid item xs={6}>
            {/* <svg height="100%" width="100%">
                        <svg style={{ border: '1px solid orange' }} width="20%" height="50%" viewBox="0 0 200 200">
                            <g>
                                <circle fill="#F4F4F9" cx="150" cy="15" r="30" />
                                <circle fill="#B8DBD9" cx="140" cy="60" r="20" />
                                <circle fill="#a1a1a1" cx="120" cy="80" r="10" />
                                <rect fill="#8C5E58" width="20" height="50" x="110" y="90" />
                                <polygon fill="#6B6570" points="100,100 150,150 50,150" />
                                <rect fill="#2CEAA3" width="200" height="10" x="0" y="190" />
                                <rect fill="#8C5E58" width="80" height="50" x="60" y="150" />
                                <rect fill="#0D1F22" width="20" height="30" x="100" y="170" />
                            </g>
                        </svg>
                        <text x={0} y={110} stroke="#757575" style={{ fontSize: 12 }}>{home.home_name}</text>

                        <line x1={30} x2={30} y1={120} y2={400} color="#757575" stroke="#757575" strokeWidth={2}></line>
                        <text x={100} y={138} stroke="#757575" style={{ fontSize: 12 }}>users</text>
                        <line x1={30} x2={200} y1={140} y2={140} color="#757575" stroke="#757575" strokeWidth={2}></line>
                        <text x={100} y={178} stroke="#eee" style={{ fontSize: 12 }}>accounts</text>
                        <line x1={30} x2={200} y1={180} y2={180} color="#757575" stroke="#757575" strokeWidth={2}></line>
                        <text x={100} y={218} stroke="#eee" style={{ fontSize: 12 }}>calendar</text>
                        <line x1={30} x2={200} y1={220} y2={220} color="#757575" stroke="#757575" strokeWidth={2}></line>

                        <circle cx="240" cy="140" r="18" fill="#2ecc71" />
                        <text  x={240} y={140} alignment-baseline="central" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#fff">{getCapitalLetter(user.last_name).slice(0, 1)}</text>
                        {/* <text x={30} y={400} stroke="#757575" style={{ fontSize: 12 }}>{user.first_name}</text> */}
            {/* </svg> */}

            {/* <Typography className={classes.displayName}>
                        Name: {`${getCapitalLetter(user.last_name)}, ${getCapitalLetter(user.first_name)}`}

                    </Typography>
                    <Typography className={classes.displayName}>
                        Home: {`${getCapitalLetter(home.home_name)}`}

                    </Typography> */}
          </Grid>
        </Grid>

        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <BaseButton
            onClick={goToDashboard}
            className={classes.formBtn}
          >
            set up later
          </BaseButton>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <BaseButton
            onClick={setUpProfile}
            variant="outlined"
            className={classes.formBtn}
          >
            set up profile
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

export default connect(mapStateToProps, mapDispatchToProps)(SuccessHomeCard);
