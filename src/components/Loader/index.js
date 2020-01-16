import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const SpinnerWrap = styled.div`
  padding-top: 60px;
  text-align: center;
`;

const Loader = props => {
  return (
    <SpinnerWrap>
      <CircularProgress size={50} {...props} />
    </SpinnerWrap>
  );
};

export default Loader;
