import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Navigation from '../Navigation';
import Header from '../Header';

const ContentWrap = styled.div`
  height: 100%;
  position: relative;
  padding-left: 250px;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Burger = styled.div`
  cursor: pointer;
  position: fixed;
  top: 12px;
  right: 12px;
  width: 30px;
  height: 22px;
  border-top: 2px solid #ffffff;
  &:after {
    content: '';
    width: 100%;
    height: 2px;
    background: #ffffff;
    position: absolute;
    top: 8px;
    left: 0;
  }
  &:before {
    content: '';
    width: 100%;
    height: 2px;
    background: #ffffff;
    position: absolute;
    top: 18px;
    left: 0;
  }
  &:hover {
    opacity: 0.8;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

const AppContainer = ({ children, history }) => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);

  useEffect(() => {
    const listener = history.listen(() => {
      setTimeout(() => {
        setOpen(false);
      }, 300);
    });
    return () => {
      listener();
    };
  }, [history]);

  return (
    <ContentWrap>
      <Burger onClick={toggleMenu} />
      <Navigation open={open} />
      <Header />
      <Box p={3}>{children}</Box>
    </ContentWrap>
  );
};

AppContainer.propTypes = {
  children: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(AppContainer);
