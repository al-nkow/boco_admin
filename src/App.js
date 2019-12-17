import React from 'react';
import { Provider } from 'mobx-react';
import 'typeface-roboto-cyrillic';
import { Router, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { red, green, orange, slateblue } from './config/colors';
import history from './history';




import LoginPage from './components/LoginPage';
import UsersPage from './components/UsersPage';
import ShopsPage from './components/ShopsPage';
import CategoriesPage from './components/CategoriesPage';
import ProductsPage from './components/ProductsPage';




import PrivateRoute from './components/PrivateRoute';
import AppContainer from './components/AppContainer';

// custom theme
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// =====================================
import LoginStore from './components/LoginPage/store';
import UsersStore from './components/UsersPage/store';
import ShopsStore from './components/ShopsPage/store';
import CategoriesStore from './components/CategoriesPage/store';
import ProductsStore from './components/ProductsPage/store';
import PositionsStore from './components/PositionsPage/store';

const store = {
  LoginStore: LoginStore.create({}),
  UsersStore: UsersStore.create({}),
  ShopsStore: ShopsStore.create({}),
  CategoriesStore: CategoriesStore.create({}),
  ProductsStore: ProductsStore.create({}),
  PositionsStore: PositionsStore.create({}),
};
// =====================================

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
          <Router history={history}>
            <Switch>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <PrivateRoute component={AppContainer}>
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route exact path="/users">
                    <UsersPage />
                  </Route>
                  <Route exact path="/shops">
                    <ShopsPage />
                  </Route>
                  <Route exact path="/categories">
                    <CategoriesPage />
                  </Route>
                  <Route path="/products">
                    <ProductsPage />
                  </Route>
                </Switch>
              </PrivateRoute>
            </Switch>
          </Router>
        </SnackbarProvider>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
