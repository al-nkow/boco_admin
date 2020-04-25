import React from 'react';
import * as PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ShopCard from '../ShopCard';

const ShopsList = ({ shops }) => {
  return (
    <>
      <Box mb={4}>
        <Grid container spacing={2}>
          {shops.map(shop => (
            <Grid item xs={12} sm={6} md={4} key={shop._id}>
              <ShopCard shop={shop} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

ShopsList.propTypes = {
  shops: PropTypes.array.isRequired,
};

export default observer(ShopsList);
