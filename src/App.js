import React from 'react';
import { Provider } from 'mobx-react';
import 'typeface-roboto-cyrillic';
import { SnackbarProvider } from 'notistack';

// custom theme
import {
  MuiThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './config/theme';

import { red, green, orange, slateblue } from './config/colors';
import Routes from './Routes';
import store from './Store';

const useStyles = makeStyles({
  success: { backgroundColor: green },
  error: { backgroundColor: red },
  warning: { backgroundColor: orange },
  info: { backgroundColor: slateblue },
});

function App() {
  const snackbarStyles = useStyles();

  return (
    <Provider {...store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={5}
          classes={{
            variantSuccess: snackbarStyles.success,
            variantError: snackbarStyles.error,
            variantWarning: snackbarStyles.warning,
            variantInfo: snackbarStyles.info,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          autoHideDuration={1000}
        >
          <Routes />
        </SnackbarProvider>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
