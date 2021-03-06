import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import Box from '@material-ui/core/Box';
import ProductCard from '../ProductCard';
import Loader from '../../../Loader';
import WithConfirmAction from '../../../WithConfirmAction';
import useProductDelete from '../../services/useProductDelete';
import ProductEdit from '../ProductEdit';
import ProductPositions from '../ProductPositions';
import CooperationsList from '../../../Cooperations/components/CooperationsList';
import Supply from '../../../Supply';

const ProductItem = ({
  id,
  enqueueSnackbar,
  confirm,
  CategoriesStore: { categories },
  SupplyStore: { getCurrentSupply, currentSupply },
  ProductsStore: {
    editProductState,
    getProductItem,
    currentProduct,
    deleteProduct,
    editProduct,
  },
  CooperationStore: {
    getCooperationsForProduct,
    list: cooperationsList,
    allAmount,
  },
}) => {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getCurrentSupply(id);
  }, [id, getCurrentSupply]);

  useEffect(() => {
    getProductItem(id);
  }, [id, getProductItem]);

  useEffect(() => {
    if (currentProduct) {
      getCooperationsForProduct({
        bocoArticle: currentProduct.bocoArticle,
      });
    }
  }, [currentProduct, getCooperationsForProduct]);

  const getCategoryName = () => {
    return categories.reduce((res, item) => {
      // eslint-disable-next-line no-underscore-dangle
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
      <Box mb={2}>
        <ProductPositions productId={id} />
      </Box>
      {currentSupply &&
      currentSupply.options &&
      currentSupply.options.length ? (
        <Box mb={3}>
          <Supply currentSupply={currentSupply} />
        </Box>
      ) : null}
      {cooperationsList && cooperationsList.length ? (
        <CooperationsList
          list={cooperationsList}
          allAmount={allAmount}
        />
      ) : null}
    </>
  );
};

ProductItem.propTypes = {
  CategoriesStore: PropTypes.object.isRequired,
  confirm: PropTypes.func.isRequired,
  CooperationStore: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  ProductsStore: PropTypes.object.isRequired,
  SupplyStore: PropTypes.object.isRequired,
};

export default inject(
  'CategoriesStore',
  'ProductsStore',
  'CooperationStore',
  'SupplyStore',
)(WithConfirmAction(withSnackbar(observer(ProductItem))));
