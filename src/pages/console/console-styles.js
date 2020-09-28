const consoleStyles = (theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    height: 64,
    zIndex: theme.zIndex.drawer + 1,
  },
  homeLoader: {
    fontSize: 14,
  },
  homeSelect: {
    width: 180,
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
  dashboardContainer: {
    height: "calc(100vh - 64px)",
    overflow: "hidden",
    backgroundColor: theme.palette.secondary.main,
    position: "relative",
    width: "calc(100% - 60px)",
    left: 60,
  },
});

export default consoleStyles;
