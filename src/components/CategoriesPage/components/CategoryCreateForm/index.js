import React from 'react';
import * as PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { LOAD_STATES } from '../../../../config/constants';

const CategoryCreateForm = ({
  values,
  errors,
  touched,
  handleSubmit,
  handleBlur,
  handleChange,
  isValid,
  addCategoryState,
  handleClose,
}) => {
  return (
    <>
      <DialogContent>
        <TextField
          autoComplete="off"
          name="name"
          value={values.name}
          label="Название"
          fullWidth
          type="text"
          helperText={errors.name && touched.name ? errors.name : ''}
          error={errors.name && touched.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          autoComplete="off"
          name="comments"
          value={values.comments}
          label="Комментарии"
          fullWidth
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={
            !isValid || addCategoryState === LOAD_STATES.PENDING
          }
        >
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
};

CategoryCreateForm.propTypes = {
  addCategoryState: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default CategoryCreateForm;
