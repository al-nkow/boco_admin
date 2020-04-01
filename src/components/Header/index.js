import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { darkerBg, lightText } from '../../config/colors';

const Wrap = styled.div`
  padding: 10px 20px;
  background: ${darkerBg};
  color: ${lightText};
  font-size: 20px;
`;

const pageNames = {
  '/': 'Ассортимент товаров',
  '/shops': 'Магазины',
  '/users': 'Пользователи',
  '/products': 'Товары',
  '/products/new': 'Добавить товар',
  '/categories': 'Категории товаров',
  '/positions': 'Ассортимент',
  '/import': 'Импорт файла с товарами',
  '/me': 'Мой профиль',
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

Header.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Header);
