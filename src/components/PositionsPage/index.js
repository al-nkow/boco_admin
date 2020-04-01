import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import WithConfirmAction from '../WithConfirmAction';
import { Wrap } from '../SharedComponents';
import PositionCard from './components/PositionCard';
import Loader from '../Loader';
import Pagination from '../Pagination';
import { LOAD_STATES } from '../../config/constants';

const PositionsPage = ({
  PositionsStore: {
    getPositions,
    positions,
    countPositions,
    loadState,
  },
}) => {
  const [filter, setFilter] = useState({ article: '' });
  const initPage = 0;
  const initLimit = 5;

  const searchByArticle = event => {
    setFilter({ article: event.target.value });
  };

  return (
    <Wrap>
      <Box mb={2}>
        <Grid container>
          <Grid item xs={4}>
            <TextField
              label="Артикул"
              fullWidth
              onChange={searchByArticle}
            />
          </Grid>
          <Grid
            item
            xs={8}
            container
            justify="flex-end"
            alignItems="flex-end"
            style={{ marginBottom: '-9px' }}
          >
            <Pagination
              label="Позиций на странице"
              initPage={initPage}
              initLimit={initLimit}
              countItems={countPositions}
              callback={getPositions}
              filter={filter}
            />
          </Grid>
        </Grid>
      </Box>
      {loadState === LOAD_STATES.PENDING && <Loader />}
      <Grid container spacing={3}>
        {positions &&
          loadState !== LOAD_STATES.PENDING &&
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
