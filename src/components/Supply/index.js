import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Title = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
`;

const Supply = ({ currentSupply }) => {
  return (
    <Card>
      <CardContent>
        <Title>Оптом</Title>
        <>
          {currentSupply.options.map(item => (
            <div key={item.wholesaleName}>
              {`${item.wholesaleName} (от ${item.quantity} шт) = `}
              <b>{`${item.price}`}</b> руб
            </div>
          ))}
        </>
      </CardContent>
    </Card>
  );
};

Supply.propTypes = {
  currentSupply: PropTypes.object.isRequired,
};

export default inject('SupplyStore')(observer(Supply));
