import React from 'react';
import { observer } from 'mobx-react';
import { Formik } from 'formik';
import validate from '../services/validate';
import ProductForm from './ProductForm';
import { LOAD_STATES } from '../../../config/constants';

const ProductEdit = ({
  product,
  categories,
  addProductState,
  cancelEdit,
  editProduct,
  enqueueSnackbar,
}) => {
  const initialValues = {
    name: product.name || '',
    brand: product.brand || '',
    bocoArticle: product.bocoArticle || '',
    category: product.category || '',
    link: product.link || '',
    height: product.height || '',
    width: product.width || '',
    length: product.length || '',
    value: product.value || '',
    weight: product.weight || '',
    color: product.color || '',
  };

  const onSubmit = async values => {
    const state = await editProduct(product._id, values);

    if (state === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при редактировании товара', {
        variant: 'error',
      });
    } else if (state === LOAD_STATES.DONE) {
      enqueueSnackbar('Товар успешно отредактирован', {
        variant: 'success',
      });
      cancelEdit();
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {props => (
          <ProductForm
            {...props}
            categories={categories}
            addProductState={addProductState}
            cancel={cancelEdit}
          />
        )}
      </Formik>
    </div>
  );
};

export default observer(ProductEdit);
