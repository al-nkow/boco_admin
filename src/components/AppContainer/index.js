import React, { useState, useEffect } from 'react';
import { Swipeable } from 'react-swipeable';
import { withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Navigation from '../Navigation';
import Header from '../Header';
import { darkBg } from '../../config/colors';

const ContentWrap = styled.div`
  height: 100%;
  position: relative;
  padding-left: 250px;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Burger = styled.div`
  z-index: 1000;
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
  &.dark {
    border-top: 2px solid ${darkBg};
    &:before {
      background: ${darkBg};
    }
    &:after {
      background: ${darkBg};
    }
  }
`;

const AppContainer = ({ children, history }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const listener = () => {
      const windowScrollValue = window.pageYOffset;
      setScrolled(windowScrollValue > 36);
    };

    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [scrolled]);

  const swipingRight = () => setOpen(true);
  const swipingLeft = () => setOpen(false);

  return (
    <Swipeable
      onSwipedRight={swipingRight}
      onSwipedLeft={swipingLeft}
    >
      <ContentWrap>
        <Burger
          onClick={toggleMenu}
          className={scrolled ? 'dark' : ''}
        />
        <Navigation open={open} />
        <div id="contentContainer">
          <Header />
          <Box p={3}>{children}</Box>
        </div>
      </ContentWrap>
    </Swipeable>
  );
};

AppContainer.propTypes = {
  children: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(AppContainer);
