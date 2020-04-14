import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import WithConfirmAction from '../WithConfirmAction';
import AddEditUserDialog from './components/AddEditUserDialog';
import UserCard from './components/UserCard';
import { LOAD_STATES } from '../../config/constants';
import { Wrap } from '../SharedComponents';

const UsersPage = ({
  confirm,
  enqueueSnackbar,
  UsersStore: {
    getUsers,
    users,
    deleteUser,
    deleteUserState,
    restoreDeleteUserState,
  },
}) => {
  const [open, setOpen] = React.useState(false);
  const toggleOpen = isOpen => setOpen(isOpen);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (deleteUserState === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при попытке удалить пользователя', {
        variant: 'error',
      });
    } else if (deleteUserState === LOAD_STATES.DONE) {
      enqueueSnackbar('Пользователь успешно удален', {
        variant: 'success',
      });
    }
    restoreDeleteUserState();
  }, [deleteUserState, enqueueSnackbar, restoreDeleteUserState]);

  const askDeleteUser = (email, id) => {
    confirm({
      message: `Вы уверены что хотите удалить пользователя ${email}? 
      Это действие невозможно будет отменить.`,
    })
      .then(() => deleteUser(id))
      .catch(() => console.log('Delete action canceled by user'));
  };

  return (
    <Wrap>
      <AddEditUserDialog open={open} toggle={toggleOpen} />
      <Box mb={2}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => toggleOpen(true)}
        >
          Добавить
        </Button>
      </Box>
      <Grid container spacing={2}>
        {users.map(user => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user._id}>
            <UserCard user={user} deleteUser={askDeleteUser} />
          </Grid>
        ))}
      </Grid>
    </Wrap>
  );
};

UsersPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  UsersStore: PropTypes.object.isRequired,
};

export default inject('UsersStore')(
  WithConfirmAction(withSnackbar(observer(UsersPage))),
);
