import React from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BaseButton from "../BaseButton/BaseButton";
import { Fade, Typography } from "@material-ui/core";
const AccountText = ({ setUpHandler }) => {
  return (
    <Fade in timeout={1000}>
      <div style={{ height: 300, position: "relative" }}>
        <Typography style={{ color: "white", fontSize: 24 }}>
          Setting up your account
        </Typography>
        <br />

        <Typography>- create accounts for this home</Typography>
        <br />
        <Typography>
          - decide to share account information with other users
        </Typography>

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

export default AccountText;
