import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

const StyledTextField = styled(TextField)`
  &.MuiTextField-root {
    margin-top: 0;
    .MuiOutlinedInput-input {
      padding: 7px 10px;
      font-size: 14px;
    }
  }
`;

const ProductPositionsForm = ({ cancel }) => {
  return (
    <>
      <TableCell align="left">
        <StyledTextField
          variant="outlined"
          autoComplete="off"
          name="name"
          fullWidth
          type="text"
        />
      </TableCell>
      <TableCell align="right">
        <StyledTextField
          variant="outlined"
          autoComplete="off"
          name="name"
          fullWidth
          type="text"
        />
      </TableCell>
      <TableCell align="right">
        <StyledTextField
          variant="outlined"
          autoComplete="off"
          name="name"
          fullWidth
          type="text"
        />
      </TableCell>
      <TableCell align="right">
        <Box component="span" mr={1}>
          <Fab size="small" color="primary" aria-label="confirm">
            <DoneIcon />
          </Fab>
        </Box>
        <Fab
          size="small"
          color="secondary"
          aria-label="cancel"
          onClick={cancel}
        >
          <CloseIcon />
        </Fab>
      </TableCell>
    </>
  );
};

export default ProductPositionsForm;