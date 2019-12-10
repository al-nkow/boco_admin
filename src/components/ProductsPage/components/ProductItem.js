import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import ProductCard from './ProductCard';
import Loader from '../../Loader';
import WithConfirmAction from '../../WithConfirmAction';
import { LOAD_STATES } from '../../../config/constants';
import history from '../../../history';

/*
2. Edit product
5. Shops block
 */

const ProductItem = ({
  enqueueSnackbar,
  confirm,
  CategoriesStore: { getCategoryItem, currentCategory },
  ProductsStore: { getProductItem, currentProduct, deleteProduct },
  id,
}) => {
  useEffect(() => {
    (async function getProductAndCategoryName() {
      const product = await getProductItem(id);
      if (product) getCategoryItem(product.category);
    })();
  }, [id, getProductItem, getCategoryItem]);

  const product = {
    ...currentProduct,
    categoryName: currentCategory ? currentCategory.name : '',
  };

  const performDeleteProduct = async productId => {
    const deleteState = await deleteProduct(productId);
    if (deleteState === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при попытке удалить товар', {
        variant: 'error',
      });
    } else if (deleteState === LOAD_STATES.DONE) {
      enqueueSnackbar('Товар успешно удалён', {
        variant: 'success',
      });
      history.push(`/products`);
    }
  };

  const confirmDeleteProduct = selectedProduct => {
    confirm({
      message: `Вы уверены что хотите удалить товар "${selectedProduct.name}"? 
      Это действие невозможно будет отменить.`,
    })
      .then(() => {
        performDeleteProduct(selectedProduct._id);
      })
      .catch(() => {
        console.log('Delete action canceled by user');
      });
  };

  return (
    <>
      {currentProduct ? (
        <ProductCard
          product={product}
          deleteProduct={confirmDeleteProduct}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default inject('CategoriesStore', 'ProductsStore')(
  WithConfirmAction(withSnackbar(observer(ProductItem))),
);
