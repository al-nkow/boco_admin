import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Formik } from 'formik';
import { withSnackbar } from 'notistack';
import validate from './services/validate';
import Dropzone from '../Dropzone';
import { LOAD_STATES } from '../../config/constants';

const ShopCreate = ({
  enqueueSnackbar,
  ShopsStore: { addShop, addShopState },
}) => {
  const [file, setFile] = useState(null);
  const initialValues = {
    name: '',
    comments: '',
  };

  const filesAdded = files => {
    setFile(files[0]);
  };

  const onSubmit = (values) => {
    const bodyFormData = new FormData();
    bodyFormData.append('name', values.name);
    bodyFormData.append('comments', values.comments);
    if (file) bodyFormData.append('shopImage', file);
    addShop(bodyFormData);
  };

  useEffect(() => {
    if (addShopState === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при добавлении магазина', {
        variant: 'error',
      });
    } else if (addShopState === LOAD_STATES.DONE) {
      enqueueSnackbar('Магазин успешно добавлен', {
        variant: 'success',
      });
      initialValues.name = '1';
      initialValues.comments = '1';
    }
  }, [addShopState, enqueueSnackbar]);

  return (
    <Box mb={4}>
      <Paper>
        <Box p={2}>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validate={validate}
            onSubmit={onSubmit}
          >
            {({
              values: { name, comments },
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
            }) => (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box pt={2}>
                    <Dropzone
                      onChange={filesAdded}
                      multiple
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
                      disabled={!isValid}
                      fullWidth
                      startIcon={<AddIcon />}
                      onClick={handleSubmit}
                    >
                      Добавить
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Formik>
        </Box>
      </Paper>
    </Box>
  );
};

export default inject('ShopsStore')(
  withSnackbar(observer(ShopCreate)),
);
