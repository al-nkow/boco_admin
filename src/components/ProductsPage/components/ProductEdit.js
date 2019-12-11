import React from 'react';
import { observer } from 'mobx-react';
import { Formik } from 'formik';
import validate from '../services/validate';
import ProductForm from './ProductForm';

const ProductEdit = ({ product, categories, addProductState, cancelEdit }) => {
  console.log('product >>>>>>', product);

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

  const onSubmit = values => {
    console.log('>>>>>>', values, product._id);
    // const id = await addProduct(values);
    //
    // if (id) {
    //   enqueueSnackbar(
    //     `Товар успешно сохранен теперь Вы можете добавить его в ассортимент Магазинов`,
    //     { variant: 'success' },
    //   );
    //   history.push(`/products/${id}`);
    // } else {
    //   enqueueSnackbar('Ошибка при добавлении товара', {
    //     variant: 'error',
    //   });
    // }
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
