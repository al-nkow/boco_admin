import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import { BASE_URL } from '../../config/constants';

const ImageWrap = styled.div`
  width: 80%;
  position: relative;
`;

const CloseBtnWrap = styled.div`
  position: absolute;
  top: -6px;
  right: -32px;
`;

const StyledImage = styled.img`
  width: 100%;
  border-radius: 4px;
  display: block;
`;

const CardEditImage = ({ clear, image }) => {
  return (
    <ImageWrap>
      <CloseBtnWrap>
        <Tooltip title="Очистить" placement="top" enterDelay={500}>
          <IconButton
            size="small"
            color="primary"
            aria-label="close"
            onClick={clear}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </CloseBtnWrap>
      <StyledImage src={`${BASE_URL}${image}`} alt="" />
    </ImageWrap>
  );
};

CardEditImage.propTypes = {
  clear: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};

export default CardEditImage;
