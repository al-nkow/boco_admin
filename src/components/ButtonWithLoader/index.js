import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const StyledCircularProgress = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -12px;
`;

const Wrapper = styled.div`
  position: relative;
`;

function ButtonWithLoading({ isPending, onClick, label, disabled }) {
  return (
    <Wrapper>
      <Button
        variant="contained"
        color="primary"
        disabled={isPending || disabled}
        onClick={onClick}
        fullWidth
      >
        {label}
      </Button>
      {isPending && <StyledCircularProgress size={24} />}
    </Wrapper>
  );
}

ButtonWithLoading.propTypes = {
  disabled: PropTypes.bool,
  isPending: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

ButtonWithLoading.defaultProps = {
  disabled: false,
  isPending: false,
};

export default ButtonWithLoading;
