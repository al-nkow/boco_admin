import React from 'react';
import * as PropTypes from 'prop-types';
import { Formik } from 'formik';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogContentText from '@material-ui/core/DialogContentText';
import validate from '../../services/validatePasswordForm';
import useTooltip from '../../services/useTooltip';

const ChangePassword = ({
  enqueueSnackbar,
  CurrentUserStore: { changePassword },
}) => {
  const initialValues = {
    oldPass: '',
    newPass: '',
    repeat: '',
  };
  const showTooltip = useTooltip(enqueueSnackbar);

  const onSubmit = async values => {
    const { oldPass, newPass } = values;
    const state = await changePassword({ oldPass, newPass });

    showTooltip(
      state,
      'Пароль успешно изменён',
      'Ошибка при изменении пароля',
    );
  };

  return (
    <Paper>
      <Box p={2}>
        <DialogContentText>
          Пароль должен содержать быквы и цифры и быть не короче 6
          символов
        </DialogContentText>

        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          }) => (
            <>
              <Box mb={2}>
                <TextField
                  autoComplete="off"
                  name="oldPass"
                  value={values.oldPass}
                  label="Старый пароль"
                  fullWidth
                  helperText={
                    errors.oldPass && touched.oldPass
                      ? errors.oldPass
                      : ''
                  }
                  error={errors.oldPass && touched.oldPass}
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  autoComplete="off"
                  name="newPass"
                  value={values.newPass}
                  label="Новый пароль"
                  fullWidth
                  helperText={
                    errors.newPass && touched.newPass
                      ? errors.newPass
                      : ''
                  }
                  error={errors.newPass && touched.newPass}
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              <Box mb={3}>
                <TextField
                  autoComplete="off"
                  name="repeat"
                  value={values.repeat}
                  label="Новый пароль ещё раз"
                  fullWidth
                  helperText={
                    errors.repeat && touched.repeat
                      ? errors.repeat
                      : ''
                  }
                  error={errors.repeat && touched.repeat}
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              <Grid direction="row" container justify="flex-end">
                <Grid item>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!isValid}
                  >
                    Изменить пароль
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Formik>
      </Box>
    </Paper>
  );
};

ChangePassword.propTypes = {
  CurrentUserStore: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default inject('CurrentUserStore')(
  withSnackbar(observer(ChangePassword)),
);
