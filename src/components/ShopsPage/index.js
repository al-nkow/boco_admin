import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import ShopsList from './components/ShopsList';
import ShopCreateDialog from './components/ShopCreateDialog';

const Wrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

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
