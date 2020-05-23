import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Title = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
`;

const Supply = ({
  productId,
  SupplyStore: { getCurrentSupply, currentSupply },
}) => {
  useEffect(() => {
    getCurrentSupply(productId);
  }, [productId, getCurrentSupply]);

  return (
    <Card>
      <CardContent>
        <Title>Оптом</Title>
        {currentSupply ? (
          <>
            {currentSupply.options.map(item => (
              <div key={item.wholesaleName}>
                {`${item.wholesaleName} (от ${item.quantity} шт) = `}
                <b>{`${item.price}`}</b> руб
              </div>
            ))}
          </>
        ) : (
          ''
        )}
      </CardContent>
    </Card>
  );
};

Supply.propTypes = {
  productId: PropTypes.string.isRequired,
  SupplyStore: PropTypes.object.isRequired,
};

export default inject('SupplyStore')(observer(Supply));
