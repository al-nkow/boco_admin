import React from 'react';
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

export default AppContainer;
