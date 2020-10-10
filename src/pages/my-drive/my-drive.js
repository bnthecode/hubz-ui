import React from "react";
import {
  withStyles,
  Typography,
  Grid,
  Slide,
  Paper,
  Avatar,
  Divider,
  Fade,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import clsx from "clsx";
import FolderView from "../../components/FolderView/FolderView";
import { green, orange, red } from "@material-ui/core/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { truncateString } from "../../utilities/ui/formatters";
import { isEmpty } from "lodash";
import {
  createFileWorkflow,
  initDrivePageWorkflow,
  createFolderWorkflow,
  selectDriveItemWorkflow,
} from "../../workflows/pages/drive-workflow";
import { connect } from "react-redux";
import BaseButton from "../../components/BaseButton/BaseButton";

const styles = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: `${theme.palette.primary.contrastText}`,
      outline: "1px solid slategrey",
    },
  },
  root: {
    backgroundColor: theme.palette.primary.main,
    margin: 20,
    padding: 8,
    borderRadius: "10px",
    transition: "all .5s",
    minHeight: 200,
    cursor: "pointer",
    textAlign: "center",
    // boxShadow: `4px 10px 6px ${theme.palette.primary.main}`,
  },
  recentItem: {
    borderRadius: 20,
    padding: 8,
    backgroundColor: theme.palette.primary.light,
    width: "90%",
    marginLeft: "8%",
    margin: 4,
  },
  documentWrapper: {
    backgroundColor: theme.palette.primary.main,
    marginTop: 36,
    padding: 24,
    minHeight: 260,
    overflow: "hidden",
    boxShadow: `0px 0px 6px ${theme.palette.primary.contrastText}`,
    position: "relative",
  },
  recentIconAdd: {
    color: theme.palette.primary.contrastText,
  },
  recentIconRemove: {
    color: red[500],
  },
  mainPanel: {
    backgroundColor: theme.palette.primary.main,
    margin: 20,
    padding: 8,
    height: 500,
    borderRadius: "10px",
    transition: "all .5s",
    position: "relative",
    cursor: "pointer",
  },
  cardTitle: {
    color: "white",
    fontWeight: 600,
  },
  container: {
    transition: "translate .5s",
  },
  pathWrapper: {
    position: "absolute",
    paddingLeft: 18,
    left: 0,
    bottom: 0,
    width: "calc(100% - 18px)",
    height: 32,
    borderRadius: "0 0 2px 2px",
    backgroundColor: theme.palette.primary.dark,
  },
  subtitle: {
    color: "white",
    fontWeight: 600,
    marginTop: 32,
  },
  fileName: {
    color: theme.palette.primary.contrastText,
    fontSize: 10,
  },
  formBtn: {
    textTransform: "none",
    margin: "24px 0 0 12px",
    color: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.primary.contrastText}`,
  },
  hoverClass: {
    height: 400,
    width: 400,
    boxShadow: `20px 20px 16px ${theme.palette.primary.main}`,
  },
  notification: {
    color: "white",
  },
  previewPaper: {
    height: 260,
    backgroundColor: theme.palette.primary.light,
    textAlign: "center",
  },
  avatar: {
    height: 20,
    width: 20,
    fontSize: 10,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  title: {
    color: "white",
    fontWeight: 600,
  },
  pathPaper: {
    position: "absolute",
    paddingLeft: 18,
    left: 100,
    bottom: 0,
    width: "calc(100% - 118px)",
    height: 32,
    borderRadius: "0 0 2px 2px",
    backgroundColor: theme.palette.primary.light,
  },
  pathText: {
    color: "white",
    fontWeight: 600,
    position: "absolute",
    left: 20,
    top: "20%",
  },
  path: {
    color: "white",
    fontWeight: 600,
    position: "absolute",
    left: 20,
    top: "20%",
  },
});
class MyDrive extends React.Component {
  state = {
    showDialogOpen: false,
    selectedItem: {},
    loadingPreview: false,
    previewFile: "",
  };
  recentItems = [
    {
      action: "added",
      file: "brandons-personal-info.txt",
      group: "Personal Documents",
    },
    { action: "added", file: "olaf-med.info.pdf", group: "Pet info" },
    { action: "removed", file: "ryker-med-info.pdf", group: "Pet info" },
    { action: "updated", file: "ryker-allergy-info.txt", group: "Pet info" },
  ];

  componentDidMount = async () => {
    const { home_drive_id, initPage } = this.props;
    console.log(home_drive_id);
    await initPage(home_drive_id);
  };

  getColor = (action) => {
    switch (action) {
      case "added":
        return green[500];
      case "removed":
        return red[500];
      case "updated":
        return orange[500];
      default:
        return "white";
    }
  };

  setSelectedFolder = (selectedItem) => {
    const { selectItem } = this.props;
    selectItem(selectedItem);
  };

  showDialogHandler = () => {
    const { showDialogOpen } = this.state;
    this.setState({ showDialogOpen: !showDialogOpen });
  };

  renderFolderActions = () => {
    const {
      classes,
      drive: { drive_data, selectedItem },
      createFile,
    } = this.props;
    const { path, location, name } = selectedItem;
    const { _id: drive_id } = drive_data;

    return (
      <Typography>
        <BaseButton
          onClick={() =>
            createFile(drive_id, selectedItem._id, {
              path,
              location,
              name: "Brandons File",
            })
          }
          className={classes.formBtn}
        >
          {" "}
          Upload to /{name}{" "}
        </BaseButton>
        <BaseButton className={classes.formBtn}> Some other action </BaseButton>
      </Typography>
    );
  };

  getRenderedPath = (selectedItem) => {
    const parsedArr = !isEmpty(selectedItem)
      ? selectedItem.path.split("/")
      : [];
    const [, ...path] = parsedArr;
    return path.join("/");
  };

  renderFileActions = () => {
    const {
      classes,
      drive: { selectedItem },
    } = this.props;

    return (
      <BaseButton onClick={this.handleLoadPreview} className={classes.formBtn}>
        View {truncateString(selectedItem.name, 18)}
      </BaseButton>
    );
  };

  renderNothingSelected = (drive_data) => {
    const { path, location, _id: drive_id } = drive_data;
    const { classes, createFolder } = this.props;
    // console.log(drive_id, folder_path)
    return (
      <div>
        <Typography className={classes.title}>Nothing selected</Typography>
        <BaseButton
          className={classes.formBtn}
          onClick={() =>
            createFolder(drive_id, {
              path: path,
              location: location,
              name: "Brandon-Folder",
            })
          }
        >
          Create Folder
        </BaseButton>
      </div>
    );
  };
  determineActions = () => {
    const {
      drive: { selectedItem },
    } = this.props;
    const isFolder = selectedItem.type === "folder";
    return isFolder ? this.renderFolderActions() : this.renderFileActions();
  };

  // determinePreviewContent = () => {
  //   const { classes } = this.props;
  //   const { previewFile } = this.state;
  //   return previewFile ? <textarea style={{ fontSize: 20, marginTop: 32, height: '100%', width: '100%'}} rows="10" cols="50"
  //   onChange={(event) => this.setState({ previewFile: event.target.value})} value={previewFile.toString()}></textarea>:
  //   <Typography className={classes.subtitle}>Nothing selected</Typography>
  // }

  determinePreviewContent = () => {
    const { classes } = this.props;
    const { previewFile } = this.state;
    return previewFile ? (
      <div dangerouslySetInnerHTML={{ __html: previewFile }}></div>
    ) : (
      <Typography className={classes.subtitle}>Nothing selected</Typography>
    );
  };

  render() {
    const { loadingPreview } = this.state;
    const { classes, drive, rootLoading } = this.props;

    const {
      drive_data: { folders = [] },
      drive_data,
      loading,
      selectedItem,
    } = drive;

    return (
      <Fade in={!rootLoading} timeout={500}>
        <Grid container>
          <Slide in direction="top" timeout={1000}>
            <Grid item xs={6}>
              <Grid item xs={12}>
                <Slide in direction="left" timeout={1000}>
                  <Card
                  elevation={24}
                    classes={{
                      root: clsx([classes.root]),
                    }}
                  >
                    <CardMedia style={{ textAlign: "center" }}></CardMedia>
                    <CardContent style={{}}>
                      <Typography className={classes.cardTitle}>
                        Recent activity
                      </Typography>
                      {this.recentItems.map((item) => (
                        <Grid container>
                          <Grid item xs={1}>
                            <Typography
                              style={{
                                textAlign: "center",
                                padding: "25%",
                                fontSize: 11,
                                color: this.getColor(item.action),
                              }}
                            >
                              {item.action.toUpperCase()}
                            </Typography>
                          </Grid>
                          <Grid item xs={11}>
                            <Paper className={classes.recentItem}>
                              <Grid container>
                                <Grid item>
                                  <Avatar className={classes.avatar}>BC</Avatar>
                                </Grid>
                                <Grid
                                  style={{
                                    height: 20,
                                    width: "55%",
                                    textAlign: "center",
                                  }}
                                  item
                                >
                                  <Typography className={classes.fileName}>
                                    <Typography
                                      style={{ color: "white", fontSize: 7 }}
                                    >
                                      file
                                    </Typography>

                                    {item.file}
                                  </Typography>
                                </Grid>
                                <Grid
                                  style={{
                                    height: 18,
                                    width: "40%",
                                    textAlign: "center",
                                  }}
                                  item
                                >
                                  <Typography
                                    style={{ color: "white", fontSize: 10 }}
                                  >
                                    <Typography
                                      style={{ color: "white", fontSize: 7 }}
                                    >
                                      group
                                    </Typography>

                                    {item.group}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                        </Grid>
                      ))}
                    </CardContent>
                  </Card>
                </Slide>
                <Slide in direction="left" timeout={1000}>
                  <Card
                  elevation={24}
                    classes={{
                      root: clsx([classes.root]),
                    }}
                  >
                    <CardMedia style={{ textAlign: "center" }}></CardMedia>
                    <CardContent style={{}}>
                      <Typography className={classes.cardTitle}>
                        Preview
                      </Typography>
                      {/* TODO loadingPreview to state.page_data.drive.loading.preview */}
                      {loadingPreview ? (
                        <div>
                          <FontAwesomeIcon
                            style={{ marginBottom: 24 }}
                            icon={faSpinner}
                            color="white"
                            size="lg"
                            spin
                          />
                          <Typography className={classes.title}>
                            Loading preview for {selectedItem.name}
                          </Typography>
                        </div>
                      ) : (
                        <div style={{ minHeight: 180 }}>
                          {this.determinePreviewContent()}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            </Grid>
          </Slide>

          <Slide in direction="left" timeout={1000}>
            <Grid item xs={6}>
              <Card
              elevation={24}
                classes={{
                  root: clsx([classes.mainPanel]),
                }}
              >
                <CardMedia style={{ textAlign: "center" }}></CardMedia>
                <CardContent style={{ textAlign: "center" }}>
                  <Typography className={classes.cardTitle}>Drive</Typography>
                  <Paper className={classes.documentWrapper}>
                    <Grid container>
                      <Grid item xs={7}>
                        {loading.drive ? (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            color="white"
                            size="lg"
                            spin
                          />
                        ) : (
                          <FolderView
                            handleClick={this.setSelectedFolder}
                            selectedItem={selectedItem}
                            folders={folders}
                          />
                        )}
                      </Grid>
                      <Grid item xs={1}>
                        <Divider
                          orientation="vertical"
                          style={{ height: 200 }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        {isEmpty(selectedItem)
                          ? this.renderNothingSelected(drive_data)
                          : this.determineActions()}
                      </Grid>
                    </Grid>
                    <Paper className={classes.pathWrapper}>
                      <Paper className={classes.pathPaper}>
                        <Typography className={classes.pathText}>
                          {this.getRenderedPath(selectedItem)}
                        </Typography>
                      </Paper>
                      <Typography className={classes.path}>
                        MyDrive:/
                      </Typography>
                    </Paper>
                  </Paper>
                  {/* TODO: parsers for drive._id */}
                </CardContent>
              </Card>
            </Grid>
          </Slide>
        </Grid>
      </Fade>
    );
  }
}
const mapStateToProps = (state) => ({
  drive: state.page_data.drive,
  home_drive_id: state.page_data.console.selectedHome.drive_id,
});

const mapDispatchToProps = {
  selectItem: selectDriveItemWorkflow,
  createFile: createFileWorkflow,
  createFolder: createFolderWorkflow,
  initPage: initDrivePageWorkflow,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MyDrive));
