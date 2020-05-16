import React from 'react';
import * as PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { useFormik } from 'formik';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import validate from '../../services/validate';

const WholesaleCardEdit = ({
  cancel,
  item: { _id, name, key, comments },
  WholesaleStore: { editWholesale },
}) => {
  const initialValues = { name, key, comments };

  const onSubmit = values => {
    editWholesale(_id, values);
    cancel();
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

WholesaleCardEdit.propTypes = {
  cancel: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  WholesaleStore: PropTypes.object.isRequired,
};

export default inject('WholesaleStore')(WholesaleCardEdit);
