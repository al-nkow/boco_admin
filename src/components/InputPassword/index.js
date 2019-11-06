import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import styled from 'styled-components';
import { textLight } from '../../config/colors';

const StyledInputAdornment = styled(InputAdornment)`
  .MuiSvgIcon-root {
    color: ${textLight};
  }
`;

const InputPassword = ({
  value,
  label,
  onChange,
  onFocus,
  onBlur,
  helperText,
  error,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <TextField
      label={label}
      type={showPassword ? 'text' : 'password'}
      fullWidth
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      helperText={helperText}
      error={error}
      disabled={disabled}
      InputProps={{
        endAdornment: (
          <StyledInputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </StyledInputAdornment>
        ),
      }}
    />
  );
};

InputPassword.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  value: PropTypes.string,
};

InputPassword.defaultProps = {
  disabled: false,
  value: '',
  onBlur: '',
  onFocus: '',
  helperText: '',
  error: false,
};

export default InputPassword;
