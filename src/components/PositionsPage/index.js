import React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import WithConfirmAction from '../WithConfirmAction';
import { Wrap } from '../SharedComponents';
import PositionCard from './components/PositionCard';
import Loader from '../Loader';
import Pagination from '../Pagination';

const PositionsPage = ({
  PositionsStore: { getPositions, positions, countPositions },
}) => {
  const initPage = 0;
  const initLimit = 5;

  return (
    <Wrap>
      <Pagination
        label="Позиций на странице"
        initPage={initPage}
        initLimit={initLimit}
        countItems={countPositions}
        callback={getPositions}
      />
      {!positions && <Loader />}
      <Grid container spacing={3}>
        {positions &&
          positions.map(item => (
            <Grid key={item._id} item xs={6} md={4}>
              <PositionCard position={item} />
            </Grid>
          ))}
      </Grid>
    </Wrap>
  );
};

PositionsPage.propTypes = {
  PositionsStore: PropTypes.object.isRequired,
};

export default inject('PositionsStore')(
  WithConfirmAction(withSnackbar(observer(PositionsPage))),
);
