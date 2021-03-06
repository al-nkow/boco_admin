import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import StoreIcon from '@material-ui/icons/Store';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import FolderIcon from '@material-ui/icons/Folder';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { darkBg, lightText, orange, blue } from '../../config/colors';
import SidebarHead from '../SidebarHead';

const Wrap = styled.div`
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0
  bottom: 0;
  width: 250px;
  background: ${darkBg};
  color: ${lightText};
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 
  0px 2px 2px 0px rgba(0,0,0,0.14), 
  0px 1px 5px 0px rgba(0,0,0,0.12);
  z-index: 100;
  transition: transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
  @media (max-width: 768px) {
    transform: translate(-100%, 0);
    &.open {
      transform: translate(0, 0);
    }
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  &.selected {
    .MuiListItem-root {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        background: ${orange};
        width: 4px;
        left: 0;
        top: 0;
        bottom: 0;
      }
    }
  }
  .MuiSvgIcon-root {
    fill: ${blue};
  }
`;

const Navigation = ({ open }) => {
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
      name: 'Оптом',
      link: '/wholesale',
      icon: <LocalMallIcon />,
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

  return (
    <Wrap className={open ? 'open' : ''}>
      <SidebarHead />
      <List>
        {menuItems.map((item, index) => (
          <StyledLink
            to={item.link}
            key={item.name}
            activeClassName="selected"
            exact={index === 0}
          >
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

Navigation.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default Navigation;
