import React from 'react';
import * as PropTypes from 'prop-types';
import { useFormik } from 'formik';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import validate from '../../../services/validate';

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

const CategoriesTableRowEdit = ({
  setEditMode,
  onSubmit,
  category: { name, comments },
}) => {
  const initialValues = { name, comments };
  const cancel = () => setEditMode(false);

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

CategoriesTableRowEdit.propTypes = {
  category: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
};

export default CategoriesTableRowEdit;
