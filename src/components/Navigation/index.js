import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
// import logo from './logo.svg';

const Wrap = styled.div`
  position: absolute;
  top: 100px;
  left: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const StyledButton = styled(Button)`
  .MuiButton-label {
    text-transform: none;
    font-weight: 400;
  }
`;

const Navigation = () => {
  return (
    <Wrap>
      <div>
        <StyledLink to="/">
          <StyledButton>Стартовая страница</StyledButton>
        </StyledLink>
      </div>
      <div>
        <StyledLink to="/login">
          <StyledButton>Страница логин</StyledButton>
        </StyledLink>
      </div>
      <div>
        <StyledLink to="/users">
          <StyledButton>Пользователи</StyledButton>
        </StyledLink>
      </div>
      {/*<img src={logo} className="App-logo" alt="logo" />*/}
    </Wrap>
  );
};

export default Navigation;
