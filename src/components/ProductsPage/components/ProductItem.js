import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import ProductCard from './ProductCard';
import Loader from '../../Loader';
import WithConfirmAction from '../../WithConfirmAction';
import useProductDelete from '../services/useProductDelete';
import ProductEdit from './ProductEdit';
import ProductPositions from './ProductPositions';

const ProductItem = ({
  id,
  enqueueSnackbar,
  confirm,
  CategoriesStore: { categories },
  ProductsStore: {
    editProductState,
    getProductItem,
    currentProduct,
    deleteProduct,
    editProduct,
  },
}) => {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getProductItem(id);
  }, [id, getProductItem]);

  const getCategoryName = () => {
    return categories.reduce((res, item) => {
      return item._id === currentProduct.category ? item.name : res;
    }, null);
  };

  const product = {
    ...currentProduct,
    categoryName: currentProduct ? getCategoryName() : '',
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
          enqueueSnackbar={enqueueSnackbar}
          product={product}
          editProduct={editProduct}
          categories={categories}
          editProductState={editProductState}
          cancelEdit={() => setEditMode(false)}
        />
      )}
      <ProductPositions productId={id} />
    </>
  );
};

ProductItem.propTypes = {
  CategoriesStore: PropTypes.object.isRequired,
  confirm: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  ProductsStore: PropTypes.object.isRequired,
};

export default inject('CategoriesStore', 'ProductsStore')(
  WithConfirmAction(withSnackbar(observer(ProductItem))),
);
