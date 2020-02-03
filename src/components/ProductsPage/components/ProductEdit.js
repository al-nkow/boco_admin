import React from 'react';
import * as PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Formik } from 'formik';
import validate from '../services/validate';
import ProductForm from './ProductForm';
import { LOAD_STATES } from '../../../config/constants';

const ProductEdit = ({
  product,
  categories,
  editProductState,
  cancelEdit,
  editProduct,
  enqueueSnackbar,
}) => {
  const initialValues = {
    name: product.name || '',
    description: product.description || '',
    brand: product.brand || '',
    bocoArticle: product.bocoArticle || '',
    category: product.category || '',
    image: product.image || '',
    height: product.height || '',
    width: product.width || '',
    thickness: product.thickness || '',
    volumeL: product.volumeL || '',
    volumeM: product.volumeM || '',
    weight: product.weight || '',
    area: product.area || '',
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
            addProductState={editProductState}
            cancel={cancelEdit}
          />
        )}
      </Formik>
    </div>
  );
};

ProductEdit.propTypes = {
  cancelEdit: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  editProduct: PropTypes.func.isRequired,
  editProductState: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

export default observer(ProductEdit);
