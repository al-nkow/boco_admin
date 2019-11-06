import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import Navigation from '../Navigation';

const Wrap = styled.div`
  height: 100%;
  position: relative;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 20px auto;
`;

const AppContainer = ({ children }) => {
  return (
    <Wrap>
      <Navigation />
      <Content>
        <Paper>
          <Box p={2}>
            {children}
          </Box>
        </Paper>
      </Content>
    </Wrap>
  )
};

export default AppContainer;
