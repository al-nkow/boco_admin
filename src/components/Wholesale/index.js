import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import WholesaleCreateDialog from './components/WholesaleCreateDialog';
import WholesaleCard from './components/WholesaleCard';
import { Wrap } from '../SharedComponents';
import { LOAD_STATES } from '../../config/constants';

const WholesalePage = ({
  WholesaleStore: {
    getWholesale,
    list,
    deleteWholesaleState,
    restoreDeleteWholesaleState,
    editWholesaleState,
    restoreEditWholesaleState,
  },
  enqueueSnackbar,
}) => {
  useEffect(() => {
    getWholesale();
  }, [getWholesale]);

  useEffect(() => {
    if (deleteWholesaleState === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при попытке удалить оптовый параметр', {
        variant: 'error',
      });
    } else if (deleteWholesaleState === LOAD_STATES.DONE) {
      enqueueSnackbar('Оптовый параметр успешно удален', {
        variant: 'success',
      });
    }
    restoreDeleteWholesaleState();
  }, [
    deleteWholesaleState,
    enqueueSnackbar,
    restoreDeleteWholesaleState,
  ]);

  useEffect(() => {
    if (editWholesaleState === LOAD_STATES.ERROR) {
      enqueueSnackbar(
        'Ошибка при редактировании оптового параметра',
        {
          variant: 'error',
        },
      );
    } else if (editWholesaleState === LOAD_STATES.DONE) {
      enqueueSnackbar('Оптовый параметр успешно отредактирован', {
        variant: 'success',
      });
    }
    restoreEditWholesaleState();
  }, [
    editWholesaleState,
    enqueueSnackbar,
    restoreEditWholesaleState,
  ]);

  return (
    <Wrap>
      <WholesaleCreateDialog />
      <Grid container spacing={2}>
        {list.map(item => (
          // eslint-disable-next-line no-underscore-dangle
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
            <WholesaleCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Wrap>
  );
};

WholesalePage.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  WholesaleStore: PropTypes.object.isRequired,
};

export default inject('WholesaleStore')(
  withSnackbar(observer(WholesalePage)),
);
