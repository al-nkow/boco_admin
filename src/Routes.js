import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import AppContainer from './components/AppContainer';
import PositionsPage from './components/PositionsPage';
import UsersPage from './components/UsersPage';
import ShopsPage from './components/ShopsPage';
import CategoriesPage from './components/CategoriesPage';
import ProductsPage from './components/ProductsPage';
import ImportPage from './components/ImportPage';
import CurrentUserPage from './components/CurrentUser';
import Wholesale from './components/Wholesale';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute component={AppContainer}>
          <Switch>
            <Route exact path="/">
              <PositionsPage />
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
            <Route path="/positions">
              <PositionsPage />
            </Route>
            <Route path="/import">
              <ImportPage />
            </Route>
            <Route path="/me">
              <CurrentUserPage />
            </Route>
            <Route path="/wholesale">
              <Wholesale />
            </Route>
          </Switch>
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
