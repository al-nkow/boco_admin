import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { Formik } from 'formik';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import ProductForm from '../ProductForm';
import validate from '../../services/validate';
import history from '../../../../history';
import { Wrap } from '../../../SharedComponents';

const ProductNew = ({
  CategoriesStore: { getCategories, categories },
  ProductsStore: { addProduct, addProductState },
  enqueueSnackbar,
}) => {
  const initialValues = {
    name: '',
    description: '',
    brand: '',
    bocoArticle: '',
    category: '',
    image: '',
    height: '',
    width: '',
    thickness: '',
    volumeL: '',
    volumeM: '',
    weight: '',
    area: '',
  };

  const onSubmit = async values => {
    const id = await addProduct(values);

    if (id) {
      enqueueSnackbar(
        `Товар успешно сохранен теперь Вы можете добавить его в ассортимент Магазинов`,
        { variant: 'success' },
      );
      history.push(`/products/${id}`);
    } else {
      enqueueSnackbar('Ошибка при добавлении товара', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Wrap>
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
          />
        )}
      </Formik>
    </Wrap>
  );
};

ProductNew.propTypes = {
  CategoriesStore: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  ProductsStore: PropTypes.object.isRequired,
};

export default inject(
  'CategoriesStore',
  'ProductsStore',
)(withSnackbar(observer(ProductNew)));
