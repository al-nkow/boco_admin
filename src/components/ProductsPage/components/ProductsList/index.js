import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import { withSnackbar } from 'notistack';
import WithConfirmAction from '../../../WithConfirmAction';
import Pagination from '../../../Pagination';
import useProductDelete from '../../services/useProductDelete';
import ProductCardCol from '../ProductCardCol';

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
  const [filter, setFilter] = useState({ bocoArticle: '' });
  const linkStyles = { textDecoration: 'none' };
  const initPage = 0;
  const initLimit = 5;

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

  const { confirmDeleteProduct } = useProductDelete(
    enqueueSnackbar,
    confirm,
    deleteProduct,
  );

  const searchByArticleBoco = event => {
    setFilter({ bocoArticle: event.target.value });
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
      <Box mb={2}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <TextField
              label="Артикул БОКО"
              fullWidth
              onChange={searchByArticleBoco}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            container
            justify="flex-end"
            alignItems="flex-end"
            style={{ marginBottom: '-9px' }}
          >
            <Pagination
              label="Товаров на странице"
              initPage={initPage}
              initLimit={initLimit}
              countItems={countProducts}
              callback={getProducts}
              filter={filter}
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        {products.map(item => (
          <Grid item xs={12} md={4} key={item._id}>
            <ProductCardCol
              product={item}
              deleteProduct={confirmDeleteProduct}
            />
          </Grid>
        ))}
      </Grid>
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
