import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const Wrap = styled.div`
  padding: 10px 20px;
  background: #546f7f;
  color: #ffffff;
  font-size: 20px;
`;

const pageNames = {
  '/': 'Главная',
  '/shops': 'Магазины',
  '/users': 'Пользователи',
  '/products': 'Товары',
  '/categories': 'Категории товаров',
};

const Header = ({ location: { pathname } }) => {
  return <Wrap>{pageNames[pathname] || 'Нет имени'}</Wrap>;
};

export default withRouter(Header);
