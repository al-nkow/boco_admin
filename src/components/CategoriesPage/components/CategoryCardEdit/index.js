import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { useFormik } from 'formik';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import validate from '../../services/validate';
import DropZone from '../../../Dropzone';
import CardEditImage from '../../../CardEditImage';

const CategoryCardEdit = ({
  setEditMode,
  onSubmit,
  category: { name, comments, image },
}) => {
  const [hasImage, setImage] = useState(image);
  const initialValues = { name, comments, image };
  const cancel = () => setEditMode(false);

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const filesAdded = value => setFieldValue('files', value);
  const clearOldImage = () => {
    setImage('');
    setFieldValue('image', '');
  };

  return (
    <>
      <CardContent>
        <div>
          {hasImage ? (
            <CardEditImage image={image} clear={clearOldImage} />
          ) : (
            <DropZone
              onChange={filesAdded}
              size="cell"
              maxFileSize={2}
              accept="image/x-png,image/jpeg"
            />
          )}
        </div>
        <TextField
          label="Название"
          autoComplete="off"
          name="name"
          value={values.name}
          type="text"
          fullWidth
          helperText={errors.name && touched.name ? errors.name : ''}
          error={errors.name && touched.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          label="Комментарий"
          autoComplete="off"
          name="comments"
          value={values.comments}
          type="text"
          fullWidth
          onChange={handleChange}
          onBlur={handleBlur}
        />
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

CategoryCardEdit.propTypes = {
  category: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
};

export default CategoryCardEdit;
