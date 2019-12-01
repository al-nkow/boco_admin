import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
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

  useEffect(() => {
    getProducts({
      page: 0,
      limit: 1,
    });
  }, [getProducts]);

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
      enqueueSnackbar('Товар успешно удален', {
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
          initPage={0}
          initLimit={5}
          pages={countProducts}
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

export default inject('ProductsStore')(
  WithConfirmAction(withSnackbar(observer(ProductsList))),
);
