import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { darkerBg, darkCardSecondaryText } from '../../config/colors';
import { AUTH_TOKEN, BASE_URL } from '../../config/constants';
import { logout } from '../../resources/api';
import history from '../../history';

const StyledCardHeader = styled(CardHeader)`
  .MuiCardHeader-content {
    min-width: 1px;
  }
  .MuiCardHeader-subheader {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${darkCardSecondaryText};
    font-size: 12px;
  }
  border-bottom: 1px solid ${darkerBg};
`;

const StyledMenuItem = styled(MenuItem)`
  .MuiSvgIcon-root {
    vertical-align: middle;
    margin-right: 10px;
  }
`;

const SidebarHead = ({
  CurrentUserStore: { getCurrentUser, name, email, avatar },
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToCurrentUser = () => {
    handleClose();
    history.push('/me');
  };

  const exit = async () => {
    setAnchorEl(null);
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
    <>
      <StyledCardHeader
        avatar={
          <Avatar src={`${BASE_URL}${avatar}`} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton
            aria-label="sidebar head menu"
            aria-controls="sidebar-head-menu"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={email}
      />
      <Menu
        id="sidebar-head-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={goToCurrentUser}>
          <PersonIcon />
          Мой профиль
        </StyledMenuItem>
        <StyledMenuItem onClick={exit}>
          <ExitToAppIcon />
          Выйти
        </StyledMenuItem>
      </Menu>
    </>
  );
};

SidebarHead.propTypes = {
  CurrentUserStore: PropTypes.object.isRequired,
};

export default inject('CurrentUserStore')(observer(SidebarHead));
