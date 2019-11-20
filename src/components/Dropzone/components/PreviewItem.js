import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

const Preview = styled.img`
  width: 100%;
  border-radius: 4px;
`;
const PreviewWrap = styled.div`
  width: 200px;
  position: relative;
  display: inline-block;
  margin: 10px 10px 0 10px;
  &&.cell {
    width: 100px;
  }
`;

const CloseBtnWrap = styled.span`
  position: absolute;
  top: -10px;
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

export default PreviewItem;