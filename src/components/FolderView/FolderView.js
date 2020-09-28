import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Description, Folder } from "@material-ui/icons";

const useTreeItemStyles = makeStyles((theme) => ({
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 0.5,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    itemId,
    labelIcon: LabelIcon,
    labelInfo,
    selectedItem,
    color,
    bgColor,
    ...other
  } = props;
  // const parentSelected = selectedItem.path && selectedItem.path.includes(labelText)
  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon
            style={{
              color:
                itemId && itemId === selectedItem._id ? "#FDD835" : "white",
            }}
            className={classes.labelIcon}
          />
          <Typography
            style={{
              color:
                itemId && itemId === selectedItem._id ? "#FDD835" : "white",
            }}
            className={classes.labelText}
          >
            {labelText}
          </Typography>
        </div>
      }
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const buildFiles = (files, handleClick, selectedItem) => {
  return files.map((file, i) => (
    <StyledTreeItem
      selectedItem={selectedItem}
      onClick={() => handleClick(file)}
      nodeId={file._id + i}
      itemId={file._id}
      labelText={file.name}
      labelIcon={Description}
    />
  ));
};

const buildFolders = (folders, handleClick, selectedItem) => {
  return folders.map((folder, i) => (
    <StyledTreeItem
      itemId={folder._id}
      selectedItem={selectedItem}
      onClick={() => handleClick(folder)}
      nodeId={folder._id + i}
      labelText={folder.name}
      labelIcon={Folder}
    >
      {folder.folders.length
        ? buildFolders(folder.folders, handleClick, selectedItem)
        : ""}
      {buildFiles(folder.files, handleClick, selectedItem)}
    </StyledTreeItem>
  ));
};

const FolderView = ({ folders, selectedItem, handleClick }) => {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={selectedItem._id}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
    >
      {buildFolders(folders, handleClick, selectedItem)}
    </TreeView>
  );
};

export default FolderView;
