import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ProductPositionCard from './components/ProductPositionCard';

const ProductPositions = ({
  ShopsStore: { getShops, shops },
  PositionsStore: { getPositions, positions },
  productId,
}) => {
  useEffect(() => {
    getShops();
    getPositions({
      page: 0,
      limit: 100,
      productId,
    });
  }, [productId, getShops, getPositions]);

  const assortment = [];

  if (shops.length) {
    shops.forEach(shopItem => {
      const shopId = shopItem._id;
      const position = positions.find(
        posItem => posItem.shopId === shopId,
      );
      const shop = {
        shopName: shopItem.name,
        shopImage: shopItem.image,
        shopId,
        ...position,
      };
      assortment.push(shop);
    });
  }

  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        {assortment.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.shopId}>
            <ProductPositionCard shop={item} productId={productId} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

ProductPositions.propTypes = {
  PositionsStore: PropTypes.object.isRequired,
  productId: PropTypes.string.isRequired,
  ShopsStore: PropTypes.object.isRequired,
};

export default inject(
  'ShopsStore',
  'PositionsStore',
)(observer(ProductPositions));
