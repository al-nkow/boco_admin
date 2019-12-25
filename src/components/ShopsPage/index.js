import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ShopsList from './components/ShopsList';
import ShopCreateDialog from './components/ShopCreateDialog';
import { Wrap } from '../SharedComponents';

const ShopsPage = ({ ShopsStore: { getShops, shops } }) => {
  useEffect(() => {
    getShops();
  }, [getShops]);

  return (
    <Wrap>
      <ShopCreateDialog />
      <ShopsList shops={shops} />
    </Wrap>
  );
};

ShopsPage.propTypes = {
  ShopsStore: PropTypes.object.isRequired,
};

export default inject('ShopsStore')(observer(ShopsPage));
