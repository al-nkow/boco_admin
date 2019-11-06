import { createMuiTheme } from '@material-ui/core/styles';
import { blue, red, text } from './colors';

export default createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: blue,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: '#0066ff',
      main: red,
      // dark: will be calculated from palette.secondary.main,
      // contrastText: '#ffcc00',
    },
    text: {
      primary: text,
      // secondary: textLight,
    },
    // error: will use the default color
    error: {
      main: red,
    },
  },
  // typography: {
  //   fontSize: 14,
  // },
  overrides: {
    MuiTextField: {
      root: {
        marginTop: '8px'
      }
    },
    MuiFormControlLabel: {
      label: {
        fontSize: '14px',
      }
    },
    MuiInputLabel: {
      root: {
        fontSize: '14px',
        '&$focused': {
          fontSize: '16px'
        },
        '&$shrink': {
          fontSize: '16px'
        },
      },
    },
    MuiDialogContentText: {
      root: {
        fontSize: '14px'
      }
    },
    MuiMenuItem: {
      root: {
        fontSize: '14px'
      }
    }



    // MuiOutlinedInput: {
    //   root: {
    //     '&$focused $notchedOutline': {
    //       borderColor: 'green',
    //       borderWidth: 1,
    //     },
    //   }
    // },

    // MuiOutlinedInput: {
    //   root: {
    //     '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
    //       borderColor: 'green',
    //       borderWidth: 1,
    //     },
    //   }
    // },

  },

});



// import { createMuiTheme } from 'material-ui/styles';
// import createPalette from 'material-ui/styles/palette';
// import createTypography from 'material-ui/styles/typography';
//
// const theme = createMuiTheme({
//   typography: createTypography(createPalette(), {
//     fontFamily: '"Comic Sans"',
//   })
// });
//
// class App extends Component {
//   render() {
//     return (
//       <MuiThemeProvider theme={theme}>
