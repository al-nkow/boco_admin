import React, { useEffect } from 'react';
import { inject } from 'mobx-react';
import { withSnackbar } from 'notistack';
import UsersTable from '../UsersTable';
import WithConfirmAction from '../WithConfirmAction';

const UsersPage = ({
  confirm,
  enqueueSnackbar,
  UsersStore: { getUsers, users },
}) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const deleteUser = (email, id) => {
    confirm({
      message: `Вы уверены что хотите удалить пользователя ${email}? 
      Это действие невозможно будет отменить.`,
    })
      .then(() => {
        console.log('DELETED >>>>>>', email, id);
      })
      .catch(() => {
        console.log('Delete action canceled by user');
      });
  };

  return (
    <div>
      <UsersTable users={users} deleteUser={deleteUser} />
    </div>
  );
};

export default inject('UsersStore')(
  WithConfirmAction(withSnackbar(UsersPage)),
);
