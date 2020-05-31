import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import CoperationCard from '../CooperationCard';
import { red } from '../../../../config/colors';

const Title = styled.div`
  font-size: 22px;
  margin-bottom: 20px;
  color: ${red};
  font-weight: 500;
  padding-left: 5px;
`;

const CooperationsList = ({ list, allAmount }) => {
  return (
    <>
      <Title>
        Активные заявки на кооперацию ({allAmount} единицы товара)
      </Title>
      <Grid container spacing={2}>
        {list.map(item => (
          // eslint-disable-next-line no-underscore-dangle
          <Grid item xs={12} sm={6} key={item._id}>
            <CoperationCard cooperation={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default observer(CooperationsList);
