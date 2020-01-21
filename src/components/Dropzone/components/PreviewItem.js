import React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

const Preview = styled.img`
  width: 100%;
  border-radius: 4px;
  display: block;
`;
const PreviewWrap = styled.div`
  width: 200px;
  position: relative;
  display: inline-block;
  margin: 10px 10px 0 10px;
  &.cell {
    width: 100px;
    display: block;
  }
`;

const CloseBtnWrap = styled.span`
  position: absolute;
  top: -6px;
  right: -32px;
`;

const PreviewItem = ({
  file: { preview, name },
  index,
  removeItem,
  size,
}) => {
  const remove = event => {
    event.stopPropagation();
    removeItem(index);
  };

  return (
    <PreviewWrap className={size}>
      <Preview src={preview} alt="" />
      {size !== 'cell' && <div>{name}</div>}
      <CloseBtnWrap>
        <IconButton
          size="small"
          color="primary"
          aria-label="delete"
          onClick={remove}
        >
          <CloseIcon />
        </IconButton>
      </CloseBtnWrap>
    </PreviewWrap>
  );
};

PreviewItem.propTypes = {
  file: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  removeItem: PropTypes.func.isRequired,
  size: PropTypes.string,
};

PreviewItem.defaultProps = {
  size: null,
};

export default PreviewItem;
