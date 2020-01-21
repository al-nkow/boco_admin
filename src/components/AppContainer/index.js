import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Navigation from '../Navigation';
import Header from '../Header';

const Wrap = styled.div`
  height: 100%;
  position: relative;
  padding-left: 250px;
`;

const AppContainer = ({ children }) => {
  return (
    <Wrap>
      <Navigation />
      <Header />
      <Box p={3}>{children}</Box>
    </Wrap>
  );
};

AppContainer.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AppContainer;
