import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import ProductCard from './ProductCard';
import Loader from '../../Loader';
import WithConfirmAction from '../../WithConfirmAction';
import useProductDelete from '../services/useProductDelete';
import ProductEdit from './ProductEdit';

/*
2. Edit product
5. Shops block
 */

const ProductItem = ({
  id,
  enqueueSnackbar,
  confirm,
  CategoriesStore: { getCategoryItem, currentCategory, categories },
  ProductsStore: {
    addProductState,
    getProductItem,
    currentProduct,
    deleteProduct,
  },
}) => {
  const [editMode, setEditMode] = useState(false);

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

  const { confirmDeleteProduct } = useProductDelete(
    enqueueSnackbar,
    confirm,
    deleteProduct,
    true,
  );

  return (
    <>
      {currentProduct && !editMode ? (
        <ProductCard
          product={product}
          deleteProduct={confirmDeleteProduct}
          editProduct={() => setEditMode(true)}
        />
      ) : (
        !editMode && <Loader />
      )}
      {currentProduct && editMode && (
        <ProductEdit
          product={product}
          categories={categories}
          addProductState={addProductState}
          cancelEdit={() => setEditMode(false)}
        />
      )}
    </>
  );
};

export default inject('CategoriesStore', 'ProductsStore')(
  WithConfirmAction(withSnackbar(observer(ProductItem))),
);
