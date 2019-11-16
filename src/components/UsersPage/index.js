import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import UsersTable from '../UsersTable';
import WithConfirmAction from '../WithConfirmAction';
import { LOAD_STATES } from '../../config/constants';
import AddEditUserDialog from '../AddEditUserDialog';

const StyledPaper = styled(Paper)`
  max-width: 1000px;
  margin: 0 auto;
`;

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

  const editUser = user => {
    console.log('EDIT >>>>>>', user);
    // toggleOpen(true);
  };

  return (
    <StyledPaper>
      <Box p={2}>
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
        <UsersTable
          users={users}
          deleteUser={askDeleteUser}
          editUser={editUser}
        />
      </Box>
    </StyledPaper>
  );
};

export default inject('UsersStore')(
  WithConfirmAction(withSnackbar(observer(UsersPage))),
);
