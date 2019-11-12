import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import StoreIcon from '@material-ui/icons/Store';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

const Wrap = styled.div`
  position: fixed;
  left: 0;
  top: 0
  bottom: 0;
  width: 250px;
  background: #577a8e;
  color: #ffffff;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Navigation = () => {
  const menuItems = [
    {
      name: 'Главная',
      link: '/',
      icon: <DashboardIcon />,
    },
    {
      name: 'Пользователи',
      link: '/users',
      icon: <GroupIcon />,
    },
    {
      name: 'Магазины',
      link: '/shops',
      icon: <StoreIcon />,
    },
    {
      name: 'Товары',
      link: '/categories',
      icon: <ShoppingBasketIcon />,
    },
    {
      name: 'Логин',
      link: '/login',
      icon: <SettingsApplicationsIcon />,
    },
  ];

  return (
    <Wrap className="MuiPaper-elevation2">
      <List>
        {menuItems.map(item => (
          <StyledLink to={item.link} key={item.name}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </Wrap>
  );
};

export default Navigation;
