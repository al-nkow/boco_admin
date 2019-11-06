import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AUTH_TOKEN } from '../../config/constants';

const PrivateRoute = ({
  component: Component,
  children,
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
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
