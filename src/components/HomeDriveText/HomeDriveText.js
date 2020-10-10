import React from "react";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BaseButton from "../BaseButton/BaseButton";
import { Fade, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
const HomeDriveText = ({ setUpHandler }) => {
  return (
    <Fade in timeout={1000}>
      <div style={{ height: 300, position: "relative" }}>
        <Typography style={{ color: green[400], fontSize: 24 }}>
          <FontAwesomeIcon
            style={{ marginRight: 16, color: green[400] }}
            icon={faCheck}
          />
          setup complete
        </Typography>
        <Typography>you can now make changes to your home drive.</Typography>
        <br />

        <BaseButton
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            textTransform: "none",
            width: 140,
          }}
          onClick={setUpHandler}
        >
          Go to drive
          <FontAwesomeIcon style={{ marginLeft: 8 }} icon={faArrowRight} />
        </BaseButton>
      </div>
    </Fade>
  );
};

export default HomeDriveText;
