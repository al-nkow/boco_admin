import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  padding: 10px 20px;
  background: #546f7f;
  color: #ffffff;
  font-size: 20px;
`;

const Header = ({ title }) => {
  return <Wrap>{title}</Wrap>;
};

export default Header;
