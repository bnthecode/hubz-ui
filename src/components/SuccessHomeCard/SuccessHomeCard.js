import React from "react";
import {
  Card,
  Typography,
  Grid,
  Slide,
  Fade,
  CardContent,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { green, red } from "@material-ui/core/colors";
import ProfileText from "../ProfileText.js/ProfileText";
import AccountText from "../AccountText/AccountText";
import HomeDriveText from "../HomeDriveText/HomeDriveText";
import UserText from "../UserText/UserText";
import BaseButton from "../BaseButton/BaseButton";

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
    height: 800,
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

  formField: {
    color: "red",
    width: 240,
  },

  helperTextLink: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
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
  homeItemBtn: {
    height: 60,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    width: "100%",
    textAlign: "left",
    textTransform: "none",
  },
  tableHead: {
    fontSize: 12,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    color: "white",
  },
  tableCell: {
    cursor: "pointer",
    borderTop: `1px solid ${theme.palette.primary.main}`,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
}));

const SuccessHomeCard = ({ history, user, next }) => {
  const classes = useStyles();

  const [selectedItem, setSelectedItem] = React.useState({ key: "profile" });

  const getItemText = () => {
    switch (selectedItem.key) {
      case "profile":
        return (
          <ProfileText
            setUpHandler={() => history.push(`${next}/profile-setup`)}
          />
        );
      case "accounts":
        return (
          <AccountText
            setUpHandler={() => history.push(`${next}/account-setup`)}
          />
        );
      case "home_drive":
        return <HomeDriveText setUpHandler={() => history.push(`/my-drive`)} />;
      case "home_users":
        return (
          <UserText setUpHandler={() => history.push(`${next}/user-setup`)} />
        );
      default:
        return "";
    }
  };

  const actionItems = [
    { label: "Profile", key: "profile", completed: false },
    { label: "Accounts", key: "accounts", completed: false },
    { label: "Home Drive", key: "home_drive", completed: true },
    { label: "Users", key: "home_users", completed: false },
  ];

  return (
    <Slide in direction="left">
      <Card elevation={24} className={classes.card}>
        <CardContent style={{ padding: 24 }}>
          <Typography>Finish setting up your home</Typography>
          <Grid style={{ marginTop: "36px" }} container>
            <Grid item xs={5}>
              <TableContainer elevation={24} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow className={classes.tableRow}>
                      <TableCell className={classes.tableHead} />
                      <TableCell className={classes.tableHead} align="right">
                        completed
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {actionItems.map((field) => (
                      <TableRow key={field.key}>
                        <TableCell
                          onClick={() => setSelectedItem(field)}
                          className={classes.tableCell}
                        >
                          <Typography
                            style={{
                              fontWeight: 600,
                              color:
                                selectedItem.key === field.key
                                  ? "#FDD835"
                                  : "white",
                            }}
                          >
                            {field.label}
                          </Typography>
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          align="right"
                          component="th"
                          scope="row"
                        >
                          <Fade in timeout={1000}>
                            <FontAwesomeIcon
                              style={{
                                color: field.completed ? green[400] : red[400],
                              }}
                              icon={field.completed ? faCheck : faTimes}
                            ></FontAwesomeIcon>
                          </Fade>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
              {getItemText(selectedItem)}
            </Grid>
          </Grid>
        </CardContent>
        <BaseButton
          style={{
            textTransform: "none",
            position: "absolute",
            right: 10,
            bottom: 10,
          }}
          onClick={() => history.push(`/${user.username}/dashboard`)}
        >
          Skip all
        </BaseButton>
      </Card>
      {/* { formHelperText } */}
    </Slide>
  );
};

export default SuccessHomeCard;
