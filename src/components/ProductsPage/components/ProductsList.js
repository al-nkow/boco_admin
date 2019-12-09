import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withSnackbar } from 'notistack';
import ProductCard from './ProductCard';
import WithConfirmAction from '../../WithConfirmAction';
import { LOAD_STATES } from '../../../config/constants';
import Pagination from '../../Pagination';

const ProductsList = ({
  url,
  categories,
  confirm,
  enqueueSnackbar,
  ProductsStore: {
    getProducts,
    deleteProduct,
    products,
    countProducts,
  },
}) => {
  const linkStyles = { textDecoration: 'none' };
  const initPage = 0;
  const initLimit = 5;

  useEffect(() => {
    getProducts({
      page: initPage,
      limit: initLimit,
    });
  }, [getProducts]);

  // Add category name to each product
  if (
    categories &&
    products &&
    categories.length &&
    products.length
  ) {
    products.map(item => {
      const category = categories.find(
        catItem => catItem._id === item.category,
      );
      item.categoryName = category ? category.name : '';
      return item;
    });
  }

  const performDeleteProduct = async id => {
    const deleteState = await deleteProduct(id);
    if (deleteState === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при попытке удалить товар', {
        variant: 'error',
      });
    } else if (deleteState === LOAD_STATES.DONE) {
      enqueueSnackbar('Товар успешно удалён', {
        variant: 'success',
      });
    }
  };

  const confirmDeleteProduct = product => {
    confirm({
      message: `Вы уверены что хотите удалить товар "${product.name}"? 
      Это действие невозможно будет отменить.`,
    })
      .then(() => {
        performDeleteProduct(product._id);
      })
      .catch(() => {
        console.log('Delete action canceled by user');
      });
  };

  return (
    <>
      <Box mb={2}>
        <Link to={`${url}/new`} style={linkStyles}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
          >
            Добавить товар
          </Button>
        </Link>
      </Box>
      {countProducts && (
        <Pagination
          label="Товаров на странице"
          initPage={initPage}
          initLimit={initLimit}
          countItems={countProducts}
          callback={getProducts}
        />
      )}
      {products.map(item => (
        <Box key={item._id} mb={2}>
          <Link to={`${url}/${item._id}`} style={linkStyles}>
            <ProductCard
              product={item}
              deleteProduct={confirmDeleteProduct}
            />
          </Link>
        </Box>
      ))}
    </>
  );
};

ProductsList.propTypes = {
  categories: PropTypes.array.isRequired,
  confirm: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  ProductsStore: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export default inject('ProductsStore')(
  WithConfirmAction(withSnackbar(observer(ProductsList))),
);
