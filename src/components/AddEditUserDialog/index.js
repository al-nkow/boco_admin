import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Formik } from 'formik';
import { withSnackbar } from 'notistack';
import UserForm from '../UserForm';
import validate from './services/validate';
import { LOAD_STATES } from '../../config/constants';

const StyledDialog = styled(Dialog)`
  .MuiDialog-paperWidthSm {
    max-width: 400px;
  }
`;

const AddEditUserDialog = ({
  enqueueSnackbar,
  open,
  toggle,
  UsersStore: { addUser, saveUserError, saveUserState },
}) => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const onSubmit = values => {
    addUser(values);
    toggle(false);
  };

  useEffect(() => {
    if (saveUserState === LOAD_STATES.ERROR) {
      enqueueSnackbar(
        saveUserError || 'Ошибка при сохранении пользователя',
        {
          variant: 'error',
        },
      );
    } else if (saveUserState === LOAD_STATES.DONE) {
      enqueueSnackbar('Пользователь добавлен в систему', {
        variant: 'success',
      });
    }
  }, [saveUserError, enqueueSnackbar, saveUserState]);

  return (
    <div>
      <StyledDialog
        open={open}
        onClose={() => toggle(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Добавить пользователя в систему
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {props => <UserForm {...props} toggle={toggle} />}
        </Formik>
      </StyledDialog>
    </div>
  );
};

export default inject('UsersStore')(
  withSnackbar(observer(AddEditUserDialog)),
);
