import React from 'react';
import * as PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import WithConfirmAction from '../../../../../WithConfirmAction';
import validatePositions from '../../services/validate';
import usePositionFormSubmit from '../../services/usePositionFormSubmit';

const ProductPositionCardForm = ({
  cancel,
  shop,
  PositionsStore: { addPosition, editPosition },
  productId,
  enqueueSnackbar,
}) => {
  const { _id, article, price, link, shopId } = shop;
  const initialValues = {
    article: article || '',
    price: price || '',
    link: link || '',
  };

  const { onSubmit } = usePositionFormSubmit(
    _id,
    shopId,
    productId,
    addPosition,
    editPosition,
    enqueueSnackbar,
    cancel,
  );

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
    validate: validatePositions,
  });

  return (
    <>
      <CardContent>
        {shop.shopName ? (
          <Typography color="primary" variant="subtitle1">
            {shop.shopName}
          </Typography>
        ) : (
          ''
        )}
        <div>
          <TextField
            label="Артикул"
            autoComplete="off"
            name="article"
            value={values.article}
            fullWidth
            type="text"
            helperText={
              errors.article && touched.article ? errors.article : ''
            }
            error={errors.article && touched.article}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <TextField
            label="Цена"
            autoComplete="off"
            name="price"
            fullWidth
            type="text"
            value={values.price}
            error={errors.price && touched.price}
            helperText={
              errors.price && touched.price ? errors.price : ''
            }
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <TextField
            label="Ссылка"
            autoComplete="off"
            name="link"
            fullWidth
            type="text"
            value={values.link}
            error={errors.link && touched.link}
            helperText={
              errors.link && touched.link ? errors.link : ''
            }
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

ProductPositionCardForm.propTypes = {
  cancel: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  PositionsStore: PropTypes.object.isRequired,
  productId: PropTypes.string.isRequired,
  shop: PropTypes.object.isRequired,
};

export default inject('PositionsStore')(
  WithConfirmAction(withSnackbar(observer(ProductPositionCardForm))),
);
