import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import ShopCreate from '../ShopCreate';
import ShopsList from '../ShopsList';

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
      <ShopCreate />
      <ShopsList shops={shops} />
    </Wrap>
  );
};

export default inject('ShopsStore')(observer(ShopsPage));
