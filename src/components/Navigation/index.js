import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import StoreIcon from '@material-ui/icons/Store';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import FolderIcon from '@material-ui/icons/Folder';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import Button from '@material-ui/core/Button';
import { darkBg, lightText, orange, blue } from '../../config/colors';

import { logout } from '../../resources/api';
import { AUTH_TOKEN } from '../../config/constants';
import history from '../../history';

const Wrap = styled.div`
  position: fixed;
  left: 0;
  top: 0
  bottom: 0;
  width: 250px;
  background: ${darkBg};
  color: ${lightText};
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 
  0px 2px 2px 0px rgba(0,0,0,0.14), 
  0px 1px 5px 0px rgba(0,0,0,0.12);
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  &.selected {
    .MuiListItem-root {
      border-left: 4px solid ${orange};
    }
  }
  .MuiSvgIcon-root {
    fill: ${blue};
  }
`;

const LogoutWrap = styled.div`
  padding: 20px;
`;

const Navigation = () => {
  const menuItems = [
    {
      name: 'Ассортимент',
      link: '/',
      icon: <DashboardIcon />,
    },
    {
      name: 'Товары',
      link: '/products',
      icon: <ShoppingBasketIcon />,
    },
    {
      name: 'Магазины',
      link: '/shops',
      icon: <StoreIcon />,
    },
    {
      name: 'Категории',
      link: '/categories',
      icon: <FolderIcon />,
    },
    {
      name: 'Пользователи',
      link: '/users',
      icon: <GroupIcon />,
    },
    {
      name: 'Импорт',
      link: '/import',
      icon: <ImportExportIcon />,
    },
  ];

  const exit = async () => {
    const refreshToken = localStorage.getItem(AUTH_TOKEN.REFRESH);
    try {
      await logout({ token: refreshToken });
    } catch (error) {
      console.error('LOGOUT ERROR: ', error);
    }
    localStorage.clear();
    history.push('/login');
  };

  return (
    <Wrap>
      <List>
        {menuItems.map((item, index) => (
          <StyledLink to={item.link} key={item.name} activeClassName="selected" exact={index === 0}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </StyledLink>
        ))}
      </List>
      <LogoutWrap>
        <Button variant="contained" onClick={exit} color="primary">
          Выход
        </Button>
      </LogoutWrap>
    </Wrap>
  );
};

export default Navigation;
