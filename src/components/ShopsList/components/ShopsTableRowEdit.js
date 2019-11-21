import React, { useState } from 'react';
import { useFormik } from 'formik';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import validate from '../../ShopCreate/services/validate';
import Dropzone from '../../Dropzone';
import ShopsTableRowImage from './ShopsTableRowImage';

const StyledTextField = styled(TextField)`
  &.MuiTextField-root {
    margin-top: 0;
    .MuiOutlinedInput-input {
      padding: 10px 20px;
    }
  }
`;

const LastTableCell = styled(TableCell)`
  &.MuiTableCell-sizeSmall:last-child {
    padding-right: 0;
  }
`;

const ShopsTableRowEdit = ({
  // askDeleteShop,
  setEditMode,
  shop: { image, name, comments },
}) => {
  const [hasImage, setOldImage] = useState(image);
  const clearOldImage = () => setOldImage('');
  const cancel = () => setEditMode(false);
  const [files, setFiles] = useState([]);

  const filesAdded = value => {
    setFiles(value);
  };

  const initialValues = { name, comments };







  const onSubmit = values => {
    console.log('SUBMIT >>>>>>', values, files, hasImage);
  };













  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  } = formik;

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {hasImage ? (
          <ShopsTableRowImage image={image} clear={clearOldImage} />
        ) : (
          <Dropzone onChange={filesAdded} size="cell" />
        )}
      </TableCell>
      <TableCell align="left">
        <StyledTextField
          variant="outlined"
          autoComplete="off"
          name="name"
          value={values.name}
          fullWidth
          type="text"
          error={errors.name && touched.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </TableCell>
      <TableCell align="right">
        <StyledTextField
          variant="outlined"
          autoComplete="off"
          name="comments"
          value={values.comments}
          fullWidth
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </TableCell>
      <LastTableCell align="right">
        <Button
          size="small"
          color="primary"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Сохранить
        </Button>
        <Button size="small" color="secondary" onClick={cancel}>
          Отмена
        </Button>
      </LastTableCell>
    </TableRow>
  );
};

export default ShopsTableRowEdit;
