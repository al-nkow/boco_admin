import React, { useEffect } from 'react';
import { withSnackbar } from 'notistack';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import ButtonWithLoader from '../ButtonWithLoader';
import InputPassword from '../InputPassword';
import { LOAD_STATES } from '../../config/constants';
import { textLight } from '../../config/colors';

const Wrap = styled.div`
  margin: 50px auto;
  width: 400px;
  max-width: 90%;
`;

const StyledInputAdornment = styled(InputAdornment)`
  .MuiSvgIcon-root {
    color: ${textLight};
    margin-right: 13px;
  }
`;

const LoginPage = ({
  enqueueSnackbar,
  LoginStore: {
    loadState,
    login,
    loginFormValues: { email, password },
    loginFormErrors: { emailError, passwordError },
    setLoginFormValues,
    setLoginFormErrors,
  },
}) => {
  const handleChange = name => event => {
    setLoginFormValues({
      [name]: event.target.value,
    });
  };

  const checkEmailValidity = () => {
    if (!email)
      setLoginFormErrors({
        emailError: 'Поле email обязательно для заполнения!',
      });
  };

  const checkPasswordValidity = () => {
    if (!password)
      setLoginFormErrors({
        passwordError: 'Поле password обязательно для заполнения!',
      });
  };

  const clearErrors = () => {
    setLoginFormErrors({
      passwordError: '',
      emailError: '',
    });
  };

  const submit = () => {
    if (!email || !password) {
      checkPasswordValidity();
      checkEmailValidity();
    } else {
      login({ email, password });
    }
  };

  useEffect(() => {
    if (loadState === LOAD_STATES.ERROR) {
      enqueueSnackbar('Неправильный email или пароль', {
        variant: 'error',
      });
    }
  }, [loadState, enqueueSnackbar]);

  return (
    <Wrap>
      <Paper>
        <Box p={2}>
          <Box mb={1}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={handleChange('email')}
              onFocus={clearErrors}
              onBlur={checkEmailValidity}
              helperText={emailError}
              error={!!emailError}
              InputProps={{
                endAdornment: (
                  <StyledInputAdornment position="end">
                    <EmailIcon />
                  </StyledInputAdornment>
                ),
              }}
            />
          </Box>
          <InputPassword
            label="Password"
            value={password}
            onChange={handleChange('password')}
            onFocus={clearErrors}
            onBlur={checkPasswordValidity}
            helperText={passwordError}
            error={!!passwordError}
          />
          <Box pt={3}>
            <ButtonWithLoader
              label="Войти"
              onClick={submit}
              isPending={loadState === LOAD_STATES.PENDING}
              disabled={Boolean(emailError || passwordError)}
            />
          </Box>
        </Box>
      </Paper>
    </Wrap>
  );
};

export default inject('LoginStore')(
  withSnackbar(observer(LoginPage)),
);
