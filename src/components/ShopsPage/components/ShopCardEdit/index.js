import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { useFormik } from 'formik';
import { withSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import validate from '../../services/validate';
import DropZone from '../../../Dropzone';
import ShopCardEditImage from './ShopCardEditImage';
import { LOAD_STATES } from '../../../../config/constants';

const ShopCardEdit = ({
  enqueueSnackbar,
  cancel,
  shop: { _id, image, name, key, comments },
  ShopsStore: { editShop },
}) => {
  const [hasImage, setImage] = useState(image);
  const [files, setFiles] = useState([]);
  const initialValues = { name, key, comments };

  const clearOldImage = () => setImage('');
  const filesAdded = value => setFiles(value);

  const formDataToBeSent = values => {
    const bodyFormData = new FormData();
    bodyFormData.append('name', values.name);
    bodyFormData.append('key', values.key);
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
    <>
      <CardContent>
        <div>
          {hasImage ? (
            <ShopCardEditImage image={image} clear={clearOldImage} />
          ) : (
            <DropZone
              onChange={filesAdded}
              size="cell"
              maxFileSize={2}
              accept="image/x-png,image/jpeg"
            />
          )}
        </div>
        <div>
          <TextField
            label="Название"
            autoComplete="off"
            name="name"
            value={values.name}
            type="text"
            fullWidth
            helperText={
              errors.name && touched.name ? errors.name : ''
            }
            error={errors.name && touched.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <TextField
            label="Название"
            autoComplete="off"
            name="key"
            value={values.key}
            type="text"
            fullWidth
            helperText={errors.key && touched.key ? errors.key : ''}
            error={errors.key && touched.key}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <TextField
            label="Название"
            autoComplete="off"
            name="comments"
            value={values.comments}
            type="text"
            fullWidth
            helperText={
              errors.comments && touched.comments
                ? errors.comments
                : ''
            }
            error={errors.comments && touched.comments}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </CardContent>
      <CardActions>
        <Grid container justify="flex-end">
          <Button
            onClick={cancel}
            color="primary"
            aria-label="confirm"
          >
            Отмена
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            aria-label="cancel"
            disabled={!isValid}
          >
            Сохранить
          </Button>
        </Grid>
      </CardActions>
    </>
  );
};

ShopCardEdit.propTypes = {
  cancel: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  shop: PropTypes.object.isRequired,
  ShopsStore: PropTypes.object.isRequired,
};

export default inject('ShopsStore')(withSnackbar(ShopCardEdit));
