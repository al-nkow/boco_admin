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
  '/products/new': 'Добавить товар',
  '/categories': 'Категории товаров',
};

const Header = ({ location: { pathname } }) => {
  let name = 'Нет имени';

  if (pageNames[pathname]) {
    name = pageNames[pathname];
  } else if (pathname.indexOf('/products/') !== -1) {
    name = 'Товар';
  }

  return <Wrap>{name}</Wrap>;
};

export default withRouter(Header);
