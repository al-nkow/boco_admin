import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { useLocation } from 'react-router-dom';
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
import { textLight, darkBg } from '../../config/colors';
import pattern from '../../public/images/email-pattern.png';
import logo from '../../public/images/logo-long.png';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.div`
  padding: 10px 0;
  background: ${darkBg};
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

const Logo = styled.a`
  display: block;
  width: 160px;
  img {
    width: 100%;
  }
`;

const PageBg = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: url(${pattern});
`;

const Wrap = styled.div`
  margin: 100px auto 0 auto;
  width: 400px;
  max-width: 90%;
`;

const StyledInputAdornment = styled(InputAdornment)`
  .MuiSvgIcon-root {
    color: ${textLight};
    margin-right: 13px;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 22px;
  margin-bottom: 20px;
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
  const location = useLocation();
  const from =
    location && location.state && location.state.from
      ? location.state.from.pathname
      : null;

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
      login({ email, password }, from);
    }
  };

  useEffect(() => {
    if (loadState === LOAD_STATES.ERROR) {
      enqueueSnackbar('Неправильный email или пароль', {
        variant: 'error',
      });
    }
  }, [loadState, enqueueSnackbar]);

  useEffect(() => {
    const listener = event => {
      if (event.charCode === 13 && !(emailError || passwordError))
        submit();
    };

    document.addEventListener('keypress', listener);

    return () => {
      document.removeEventListener('keypress', listener);
    };
  });

  return (
    <PageBg>
      <Header>
        <Container>
          <Logo href="/">
            <img src={logo} alt="" />
          </Logo>
        </Container>
      </Header>
      <Wrap>
        <Paper>
          <Box p={2}>
            <Title>Административная панель</Title>
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
    </PageBg>
  );
};

LoginPage.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  LoginStore: PropTypes.object.isRequired,
};

export default inject('LoginStore')(
  withSnackbar(observer(LoginPage)),
);
