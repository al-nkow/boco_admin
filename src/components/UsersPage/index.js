import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import UsersTable from '../UsersTable';
import WithConfirmAction from '../WithConfirmAction';
import { LOAD_STATES } from '../../config/constants';

const UsersPage = ({
  confirm,
  enqueueSnackbar,
  UsersStore: { getUsers, users, deleteUser, deleteUserState },
}) => {
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
      <UsersTable users={users} deleteUser={askDeleteUser} />
    </div>
  );
};

export default inject('UsersStore')(
  WithConfirmAction(withSnackbar(observer(UsersPage))),
);
