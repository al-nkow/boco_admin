import React from 'react';
import styled from 'styled-components';
import Navigation from '../Navigation';

const Wrap = styled.div`
  height: 100%;
  position: relative;
  padding-left: 250px;
`;

const Content = styled.div`
  margin: 0 auto 20px auto;
  overflow: hidden;
`;

const AppContainer = ({ children }) => {
  return (
    <Wrap>
      <Navigation />
      <Content>{children}</Content>
    </Wrap>
  );
};

export default AppContainer;
