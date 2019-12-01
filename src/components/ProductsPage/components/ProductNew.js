import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { Formik } from 'formik';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { withSnackbar } from 'notistack';
import ProductForm from './ProductForm';
import validate from '../services/validate';
import history from '../../../history';

const Wrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const ProductNew = ({
  CategoriesStore: { getCategories, categories },
  ProductsStore: { addProduct, addProductState },
  enqueueSnackbar,
}) => {
  const initialValues = {
    name: '',
    brand: '',
    bocoArticle: '',
    category: '',
    link: '',
    height: '',
    width: '',
    length: '',
    value: '',
    weight: '',
    color: '',
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

export default inject('CategoriesStore', 'ProductsStore')(
  withSnackbar(observer(ProductNew)),
);
