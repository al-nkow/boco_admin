import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import UsersTable from '../UsersTable';
import WithConfirmAction from '../WithConfirmAction';
import { LOAD_STATES } from '../../config/constants';
import AddEditUserDialog from '../AddEditUserDialog';

const UsersPage = ({
  confirm,
  enqueueSnackbar,
  UsersStore: { getUsers, users, deleteUser, deleteUserState },
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
  }, [deleteUserState, enqueueSnackbar]);

  const askDeleteUser = (email, id) => {
    confirm({
      message: `Вы уверены что хотите удалить пользователя ${email}? 
      Это действие невозможно будет отменить.`,
    })
      .then(() => {
        deleteUser(id);
      })
      .catch(() => {
        console.log('Delete action canceled by user');
      });
  };

  return (
    <div>
      <AddEditUserDialog open={open} toggle={toggleOpen} />
      <Button
        style={{ float: 'right', marginBottom: '20px' }}
        variant="contained"
        color="primary"
        size="small"
        startIcon={<AddIcon />}
        onClick={() => toggleOpen(true)}
      >
        Добавить
      </Button>
      <UsersTable users={users} deleteUser={askDeleteUser} />
    </div>
  );
};

export default inject('UsersStore')(
  WithConfirmAction(withSnackbar(observer(UsersPage))),
);
