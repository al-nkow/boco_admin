/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import * as PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AUTH_TOKEN } from '../../config/constants';

const PrivateRoute = ({
  component: Component,
  children,
  location,
  ...rest
}) => {
  const isAuthenticated = localStorage.getItem(AUTH_TOKEN.NAME);
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Component {...props}>{children}</Component>;
        }
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

PrivateRoute.defaultProps = {
  location: null,
};

export default PrivateRoute;
