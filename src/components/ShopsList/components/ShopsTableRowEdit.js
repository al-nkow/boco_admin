import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { BASE_URL } from '../../../config/constants';
import Dropzone from '../../Dropzone';

const StyledImage = styled.img`
  width: 100%;
  border-radius: 4px;
  display: block;
`;

const ImageWrap = styled.div`
  width: 100px;
  position: relative;
`;

const StyledTextField = styled(TextField)`
  &.MuiTextField-root {
    margin-top: -4px;
  }
`;

const LastTableCell = styled(TableCell)`
  &.MuiTableCell-sizeSmall:last-child {
    padding-right: 0;
  }
`;

const CloseBtnWrap = styled.div`
  position: absolute;
  top: -4px;
  right: -32px;
`;

const ShopsTableRowEdit = ({
  // askDeleteShop,
  setEditMode,
  shop: { image, name, comments },
}) => {
  const [hasImage, setOldImage] = useState(image);
  const clearOldImage = () => setOldImage('');
  const [files, setFiles] = useState([]);

  const filesAdded = value => {
    setFiles(value);
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {hasImage ? (
          <ImageWrap>
            <CloseBtnWrap>
              <Tooltip
                title="Очистить"
                placement="top"
                enterDelay={500}
              >
                <IconButton
                  size="small"
                  color="primary"
                  aria-label="close"
                  onClick={clearOldImage}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </CloseBtnWrap>
            <StyledImage src={`${BASE_URL}${image}`} alt="" />
          </ImageWrap>
        ) : (
          <Dropzone onChange={filesAdded} size="cell" />
        )}
      </TableCell>
      <TableCell align="left">
        <StyledTextField
          autoComplete="off"
          name="name"
          // value={name}
          label="Название"
          fullWidth
          type="text"
          // helperText={
          //   errors.name && touched.name ? errors.name : ''
          // }
          // error={errors.name && touched.name}
          // onChange={handleChange}
          // onBlur={handleBlur}
        />
      </TableCell>
      <TableCell align="right">
        <StyledTextField
          autoComplete="off"
          name="comments"
          // value={comments}
          label="Комментарии"
          fullWidth
          type="text"
          // onChange={handleChange}
          // onBlur={handleBlur}
        />
      </TableCell>
      <LastTableCell align="right">
        <Button size="small" color="primary">Сохранить</Button>
        <Button size="small" color="secondary" onClick={() => setEditMode(false)}>Отмена</Button>
      </LastTableCell>
    </TableRow>
  );
};

export default ShopsTableRowEdit;
