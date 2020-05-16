import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { LOAD_STATES } from '../../../../config/constants';

const StyledDialogContent = styled(DialogContent)`
  max-width: 400px;
`;

const WholesaleCreateForm = ({
  values,
  errors,
  touched,
  handleSubmit,
  handleBlur,
  handleChange,
  isValid,
  addWholesaleState,
  handleClose,
}) => {
  return (
    <>
      <StyledDialogContent>
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
          name="key"
          value={values.key}
          label="Ключ"
          fullWidth
          type="text"
          helperText={errors.key && touched.key ? errors.key : ''}
          error={errors.key && touched.key}
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
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={
            !isValid || addWholesaleState === LOAD_STATES.LOADING
          }
        >
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
};

WholesaleCreateForm.propTypes = {
  addWholesaleState: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default WholesaleCreateForm;
