import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useFormik } from 'formik';
import { withSnackbar } from 'notistack';
import validate from './services/validate';
import Dropzone from '../Dropzone';
import { LOAD_STATES } from '../../config/constants';

const ShopCreate = ({
  enqueueSnackbar,
  ShopsStore: { addShop, addShopState },
}) => {
  const [files, setFiles] = useState([]);
  const initialValues = {
    name: '',
    comments: '',
  };

  const filesAdded = value => {
    setFiles(value);
  };

  const onSubmit = async (values, { resetForm }) => {
    const bodyFormData = new FormData();
    bodyFormData.append('name', values.name);
    bodyFormData.append('comments', values.comments);

    if (files && files.length)
      bodyFormData.append('shopImage', files[0]);

    const state = await addShop(bodyFormData);

    if (state === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при добавлении магазина', {
        variant: 'error',
      });
    } else if (state === LOAD_STATES.DONE) {
      enqueueSnackbar('Магазин успешно добавлен', {
        variant: 'success',
      });
      resetForm();
      setFiles([]);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const {
    values: { name, comments },
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  } = formik;

  return (
    <Box mb={4}>
      <Paper>
        <Box p={2}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box pt={2}>
                  <Dropzone
                    onChange={filesAdded}
                    maxFileSize={2}
                    value={files}
                    accept="image/x-png,image/jpeg"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="off"
                  name="name"
                  value={name}
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
                  name="comments"
                  value={comments}
                  label="Комментарии"
                  fullWidth
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Box mt={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={
                      !isValid || addShopState === LOAD_STATES.PENDING
                    }
                    fullWidth
                    startIcon={<AddIcon />}
                    onClick={handleSubmit}
                  >
                    Добавить
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default inject('ShopsStore')(
  withSnackbar(observer(ShopCreate)),
);
