import { createMuiTheme } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#455A64",
      contrastText: "#FDD835",
    },
    secondary: {
      main: "#37474F",
      light: "#607d8b",
      dark: "#f06292",
      contrastText: teal["A700"],
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiAppBar: {
      elevation: 8
    },
    MuiSelect: {
      disableRipple: true,
    },
    MuiMenu: {
      style: {
        border: 'none',
      }
    },
    MuiMenuItem: {
      style: {
        ':&hover': {
          backgroundColor: 'white'
        },
        margin: 0,
        fontSize: 12,
        color: "white",
        backgroundColor: "#455A64",
        border: 'none',
        height: 40,

      }
    }
  },
});
export default theme;
