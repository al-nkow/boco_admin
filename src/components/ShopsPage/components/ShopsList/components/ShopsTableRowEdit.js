import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { useFormik } from 'formik';
import { withSnackbar } from 'notistack';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import validate from '../../../services/validate';
import DropZone from '../../../../Dropzone';
import ShopsTableRowImage from './ShopsTableRowImage';
import { LOAD_STATES } from '../../../../../config/constants';

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
  enqueueSnackbar,
  setEditMode,
  shop: { _id, image, name, comments },
  ShopsStore: { editShop },
}) => {
  const [hasImage, setImage] = useState(image);
  const [files, setFiles] = useState([]);
  const initialValues = { name, comments };

  const clearOldImage = () => setImage('');
  const cancel = () => setEditMode(false);
  const filesAdded = value => setFiles(value);

  const formDataToBeSent = values => {
    const bodyFormData = new FormData();
    bodyFormData.append('name', values.name);
    bodyFormData.append('comments', values.comments);
    bodyFormData.append('image', hasImage);

    if (files && files.length) bodyFormData.append('file', files[0]);
    return bodyFormData;
  };

  const onSubmit = async values => {
    const bodyFormData = formDataToBeSent(values);
    const state = await editShop(_id, bodyFormData);

    if (state === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при редактировании магазина', {
        variant: 'error',
      });
    } else if (state === LOAD_STATES.DONE) {
      enqueueSnackbar('Магазин успешно отредактирован', {
        variant: 'success',
      });
      cancel();
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {hasImage ? (
          <ShopsTableRowImage image={image} clear={clearOldImage} />
        ) : (
          <DropZone onChange={filesAdded} size="cell" />
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

ShopsTableRowEdit.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
  shop: PropTypes.object.isRequired,
  ShopsStore: PropTypes.object.isRequired,
};

export default inject('ShopsStore')(withSnackbar(ShopsTableRowEdit));
