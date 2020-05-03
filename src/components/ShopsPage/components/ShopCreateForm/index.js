import React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DropZone from '../../../Dropzone';
import { LOAD_STATES } from '../../../../config/constants';

const ShopCreateForm = ({
  values,
  errors,
  touched,
  setFieldValue,
  handleSubmit,
  handleBlur,
  handleChange,
  isValid,
  addShopState,
  handleClose,
}) => {
  const filesAdded = value => setFieldValue('files', value);

  return (
    <>
      <DialogContent>
        <DialogContentText>
          Поле Название обязательно для заполнения. Вы можете также
          загрузить логотип магазина - файл не превышающий размер 2Мб
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box pt={2}>
              <DropZone
                onChange={filesAdded}
                maxFileSize={2}
                accept="image/x-png,image/jpeg"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="off"
              name="name"
              value={values.name}
              label="Название"
              fullWidth
              type="text"
              helperText={
                errors.name && touched.name ? errors.name : ''
              }
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
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!isValid || addShopState === LOAD_STATES.PENDING}
        >
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
};

ShopCreateForm.propTypes = {
  addShopState: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default ShopCreateForm;
