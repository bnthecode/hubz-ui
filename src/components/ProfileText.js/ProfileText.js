import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fade, Typography } from "@material-ui/core";
import React from "react";
import BaseButton from "../BaseButton/BaseButton";

const ProfileText = ({ setUpHandler }) => {
  return (
    <Fade in timeout={1000}>
      <div style={{ height: 300, position: "relative" }}>
        <Typography style={{ color: "white", fontSize: 24 }}>
          Setting up your profile
        </Typography>
        <br />

        <Typography>- roles for this home</Typography>
        <br />
        <Typography>- account profile picture</Typography>
        <br />
        <Typography>- phone number</Typography>
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

export default ProfileText;
