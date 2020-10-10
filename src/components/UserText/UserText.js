import React from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BaseButton from "../BaseButton/BaseButton";
import { Fade, Typography } from "@material-ui/core";

const UserText = ({ setUpHandler }) => {
  return (
    <Fade in timeout={1000}>
      <div style={{ height: 300, position: "relative" }}>
        <Typography style={{ color: "white", fontSize: 24 }}>
          Setting up this homes users
        </Typography>
        <br />

        <Typography>- add users to your home</Typography>
        <br />
        <Typography>- set privileges for your home users</Typography>
        <br />
        <BaseButton
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            textTransform: "none",
            width: 100,
          }}
          onClick={setUpHandler}
        >
          Setup
          <FontAwesomeIcon style={{ marginLeft: 8 }} icon={faArrowRight} />
        </BaseButton>
      </div>
    </Fade>
  );
};

export default UserText;
