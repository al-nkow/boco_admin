import React from 'react';
import Fab from '@material-ui/core/Fab';
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
`;

const CloseBtnWrap = styled.span`
  position: absolute;
  right: -5px;
  top: -5px;
`;

const PreviewItem = ({ file, index, removeItem }) => {
  return (
    <PreviewWrap>
      <Preview src={file.preview} alt="" />
      <div>{file.name}</div>
      <CloseBtnWrap>
        <Fab
          size="small"
          color="secondary"
          aria-label="delete"
          onClick={event => {
            event.stopPropagation();
            console.log('>>>>>>', index);
            removeItem(index);
          }}
        >
          <CloseIcon />
        </Fab>
      </CloseBtnWrap>
    </PreviewWrap>
  );
};

export default PreviewItem;