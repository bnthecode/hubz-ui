import React from "react";
import {
  withStyles,
  Typography,
  Card,
  Grid,
  MenuItem,
  Paper,
  Grow,
  Slide,
} from "@material-ui/core";
import CalendarComponent from "react-calendar";
import moment from "moment";
import BottomPanel from "../../components/BottomPanel/BottomPanel";
import BaseSelect from "../../components/BaseSelect/BaseSelect";

import BillForm from "../../components/BillForm/BillForm";
import ReminderForm from "../../components/ReminderForm/ReminderForm";
import BaseButton from "../../components/BaseButton/BaseButton";

const styles = (theme) => ({
  title: {
    color: "white",
    fontWeight: 600,
  },
  btnText: {
    color: "white",
    fontSize: 12,
    fontWeight: 600,
  },
  root: {
    backgroundColor: theme.palette.primary.main,
    margin: 20,
    padding: 8,
    borderRadius: "10px",
    transition: "all .5s",
    height: "90%",
    cursor: "pointer",
    textAlign: "center",
    // boxShadow: `4px 10px 6px ${theme.palette.primary.main}`,
  },

  calendar: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    width: "100%",
    height: "100%",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  miniCalendar: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    width: "100%",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  calendarContent: {},
  calendarTile: {
    color: "white",
    minHeight: 60,
    minWidth: 60,
  },
  calendarMiniTile: {
    color: "white",
    width: 60,
    height: 60,
  },
  calendarCard: {
    textAlign: "center",
    color: "white",
    backgroundColor: theme.palette.secondary.main,
    width: "100%",
    height: 600,
  },
  formPaper: {
    backgroundColor: theme.palette.primary.main,
    padding: 8,
    height: "100%",
  },
});
class Calendar extends React.Component {
  state = {
    date: new Date(),
    showSlider: false,
    calendarEventData: {
      event_type: "bill",
      date: moment(),
    },
  };
  onChange = (date) => this.setState({ date });

  renderTiles = (item) => {
    const { classes } = this.props;
    if (moment(item.date).format("MMDDYY") === "101220") {
      return <div className={classes.calendarContent}>12th</div>;
    }
    return <div className={classes.calendarContent}></div>;
  };

  handleCreateEvent = () => {
    const { showSlider } = this.state;
    this.setState({ showSlider: !showSlider });
  };

  handleFormField = (event, key) => {
    const { calendarEventData } = this.state;
    const value = event && event.target ? event.target.value : event;

    this.setState({
      calendarEventData: {
        ...calendarEventData,
        [key]: value,
      },
    });
  };

  loadEventForm = (type) => {
    const { classes } = this.props;
    const { calendarEventData } = this.state;
    let form = "";
    switch (type) {
      case "bill": {
        form = (
          <BillForm
            formData={calendarEventData}
            handleChange={this.handleFormField}
          />
        );
        break;
      }
      case "reminder": {
        form = (
          <ReminderForm
            formData={calendarEventData}
            handleChange={this.handleFormField}
          />
        );
        break;
      }
      default:
        return <div> you selected a something..?</div>;
    }
    return (
      <Paper elevation={24} className={classes.formPaper}>
        {form}
      </Paper>
    );
  };

  render() {
    const { showSlider, calendarEventData } = this.state;
    const { classes, drawerOpen } = this.props;
    const panelItems = [
      {
        content: (
          <Typography className={classes.btnText}>
            Create a new event
          </Typography>
        ),
        handler: this.handleCreateEvent,
      },
    ];

    const sliderTitle = (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography style={{ alignItems: "right" }}>
          Create a new event
        </Typography>
        <Typography style={{ alignItems: "left" }}>
          {moment(calendarEventData.date).format("MMMM DD, YYYY")}
        </Typography>
      </div>
    );
    const sliderContent = (
      <div>
        <Grid spacing={2} container>
          <Grid item xs={6}>
            <BaseSelect
              spacing={16}
              label="Event type"
              onChange={(e) => this.handleFormField(e, "event_type")}
              value={calendarEventData.event_type}
            >
              <MenuItem value="bill">Bill</MenuItem>
              <MenuItem value="reminder">Reminder</MenuItem>
            </BaseSelect>

            {this.loadEventForm(calendarEventData.event_type)}
          </Grid>
          <Grid style={{ textAlign: "center" }} item xs={6}>
            <CalendarComponent
              tileClassName={classes.calendarMiniTile}
              className={classes.miniCalendar}
              onChange={(e) => this.handleFormField(e, "date")}
            />

                <BaseButton style={{ margin: 24, width: 100, }}>Cancel</BaseButton>


                <BaseButton style={{ margin: 24, width: 100 }}>Create</BaseButton>

          </Grid>
        </Grid>
      </div>
    );
    return (
      <div>
        <Grid container>
          <Grid item xs={3}>
            <Card
              elevation={24}
              classes={{
                root: classes.root,
              }}
            >
              <Typography>Upcoming</Typography>
            </Card>
          </Grid>
          <Grid item xs={7}>
            <Card
              elevation={24}
              classes={{
                root: classes.root,
              }}
            >
              <CalendarComponent
                tileContent={this.renderTiles}
                tileClassName={classes.calendarTile}
                className={classes.calendar}
                onChange={this.onChange}
                value={this.state.date}
              />
             
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card
              elevation={24}
              classes={{
                root: classes.root,
              }}
            >
              <Typography>Reminders</Typography>
            </Card>
          </Grid>
        </Grid>
        <BottomPanel
          panelItems={panelItems}
          withSlider={true}
          sliderProps={{
            sliderTitle: sliderTitle,
            drawerOpen: drawerOpen,
            sliderOpen: showSlider,
            sliderContent: sliderContent,
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Calendar);
