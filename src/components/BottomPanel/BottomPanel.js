import {
  Backdrop,
  Fade,
  Grid,
  Grow,
  makeStyles,
  Paper,
  Slide,
  Typography,
} from "@material-ui/core";
import React from "react";
import BaseButton from "../BaseButton/BaseButton";

const useStyles = makeStyles((theme) => ({
  bottomToolbar: {
    position: "absolute",
    bottom: 0,
    height: 60,
    boxShadow: `2px 2px 16px ${theme.palette.primary.dark}`,
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  paper: {
    transition: "all .75s",
    position: "absolute",
    padding: 16,
    bottom: -60,
    right: 30,
    width: "50%",
    boxShadow: `0px 0px 20px #212121`,
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  paperHeader: {
    paddingLeft: 16,
    paddingRight: 16,
    transition: "all .75s",
    position: "absolute",
    right: 30,
    width: "50%",
    zIndex: 9000,
    backgroundColor: theme.palette.primary.main,
    boxShadow: `2px 2px 16px ${theme.palette.primary.dark}`,
    color: "white",
    borderRadius: "4px 4px 0px 0px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(50, 50, 50, 0.3)",
    marginTop: 64,
    marginBottom: 60,
  },
  sliderTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: 600,
    marginTop: 8,
  },
}));

const BottomPanel = ({ panelItems, withSlider = false, sliderProps = {} }) => {
  const {
    sliderOpen,
    sliderContent,
    sliderTitle,
    sliderHandler,
    drawerOpen,
  } = sliderProps;
  const [sliderFinishedOpen, setSliderOpen] = React.useState(sliderOpen);

  React.useEffect(() => {
    setTimeout(() => {
      setSliderOpen(sliderOpen);
    }, 750);
  }, [sliderOpen]);

  const classes = useStyles();
  return (
    <div>
      <Slide in timeout={1000} direction="up">
        <Paper
          style={{ width: withSlider ? "45%" : "99%" }}
          className={classes.bottomToolbar}
        >
          <Grid container style={{ paddingLeft: 12 }} spacing={6}>
            {panelItems.map((item) => (
              <Grid
                style={{ margin: "10px 0px 10px" }}
                item
                xs={withSlider ? 4 : 12}
              >
                <BaseButton onClick={item.handler}> {item.content} </BaseButton>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Slide>

      {withSlider ? (
        <div>
          <Paper
            elevation={sliderOpen ? 24 : 0}
            style={{
              height: 60,
              bottom: sliderOpen ? "calc(75% - 16px)" : 0,
            }}
            className={classes.paperHeader}
          >
            {sliderOpen ? (
              <Fade in timeout={3000}>
                <Typography className={classes.sliderTitle}>
                  {" "}
                  {sliderTitle}
                </Typography>
              </Fade>
            ) : (
              ""
            )}
          </Paper>
          <Backdrop
            style={{ marginLeft: drawerOpen ? 240 : 60 }}
            className={classes.backdrop}
            open={sliderOpen === true ? sliderOpen : sliderFinishedOpen}
          >
            <Paper
              elevation={sliderOpen ? 24 : 0}
              style={{
                height: sliderOpen ? "75%" : 0,
              }}
              className={classes.paper}
            >
              <div style={{ marginTop: 16 }}>
                {sliderContent}
                </div>
            </Paper>
          </Backdrop>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default BottomPanel;
