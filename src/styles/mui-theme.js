import { createMuiTheme } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";

const theme = createMuiTheme({
  // DEFAULT
  palette: {
    primary: {
      main: "#455A64",
      contrastText: "#FDD835",
      // contrastText: teal[400],
    },
    secondary: {
      main: "#37474F",
      light: "#607d8b",
      dark: "#f06292",
      contrastText: teal["A700"],
    },
  },
  // palette: {
  //   primary: {
  //     main: '#222831',
  //     light: '#393e46',
  //     dark: "#222831",
  //     contrastText: "#b55400",
  //   },
  //   secondary: {
  //     main: "#393e46",
  //     light: "#607d8b",
  //     dark: "#f06292",
  //     contrastText: '#212121',
  //   },
  // },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiAppBar: {
      elevation: 8,
    },
    MuiSelect: {
      disableRipple: true,
    },
    MuiMenu: {
      style: {
        border: "none",
      },
    },
    MuiTypography: {
      style: {
        color: "white",
        fontWeight: 600,
      },
    },
    MuiMenuItem: {
      style: {
        ":&hover": {
          backgroundColor: "white",
        },
        margin: 0,
        fontSize: 12,
        color: "white",
        backgroundColor: "#455A64",
        border: "none",
        height: 40,
      },
    },
  },
});
export default theme;
