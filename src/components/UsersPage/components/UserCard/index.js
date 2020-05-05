import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { BASE_URL, AUTH_TOKEN } from '../../../../config/constants';
import history from '../../../../history';

const UserName = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
`;

const UserEmail = styled.div`
  font-size: 14px;
`;

const StyledAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    width: 160px;
    height: 160px;
  }
`;

const Wrap = styled(Paper)`
  position: relative;
`;

const StyledIconButton = styled(IconButton)`
  &.MuiButtonBase-root {
    position: absolute;
    top: 2px;
    right: 2px;
  }
`;

const UserCard = ({
  user: { name, avatar, email, _id },
  deleteUser,
}) => {
  const userId = localStorage.getItem(AUTH_TOKEN.USER_ID);
  const deleteClickHandler = () => {
    deleteUser(email, _id);
  };
  const urlImg = avatar ? BASE_URL + avatar : '';
  const viewName = name[0].toUpperCase();

  const editClickHandler = () => {
    history.push(`/me`);
  };

  return (
    <Wrap align="center">
      <Box p={2}>
        <Box mb={2}>
          <StyledAvatar alt={name} src={urlImg}>
            {viewName}
          </StyledAvatar>
        </Box>
        <UserName>{name}</UserName>
        <UserEmail>{email}</UserEmail>
      </Box>
      {userId !== _id ? (
        <StyledIconButton
          color="primary"
          aria-label="delete user"
          onClick={deleteClickHandler}
        >
          <DeleteIcon />
        </StyledIconButton>
      ) : (
        <StyledIconButton
          color="primary"
          aria-label="edit user"
          onClick={editClickHandler}
        >
          <EditIcon />
        </StyledIconButton>
      )}
    </Wrap>
  );
};

UserCard.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserCard;
