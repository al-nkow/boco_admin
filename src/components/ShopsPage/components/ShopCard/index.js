import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Card from '@material-ui/core/Card';
import { withSnackbar } from 'notistack';
import ShopCardView from '../ShopCardView';
import ShopCardEdit from '../ShopCardEdit';
import WithConfirmAction from '../../../WithConfirmAction';
import { LOAD_STATES } from '../../../../config/constants';

const ShopCard = ({
  shop,
  confirm,
  enqueueSnackbar,
  ShopsStore: { deleteShop },
}) => {
  const [edit, setEdit] = useState(false);

  const performDeleteShop = async id => {
    const deleteState = await deleteShop(id);
    if (deleteState === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при попытке удалить магазин', {
        variant: 'error',
      });
    } else if (deleteState === LOAD_STATES.DONE) {
      enqueueSnackbar('Магазин успешно удален', {
        variant: 'success',
      });
    }
  };

  const askDeleteShop = (name, id) => {
    confirm({
      message: `Вы уверены что хотите удалить магазин ${name}? 
      Это действие невозможно будет отменить.`,
    })
      .then(performDeleteShop.bind(null, id))
      .catch(() => {});
  };

  const setEditFunc = () => setEdit(true);
  const cancel = () => setEdit(false);

  return (
    <Card>
      {!edit ? (
        <ShopCardView
          setEdit={setEditFunc}
          shop={shop}
          askDeleteShop={askDeleteShop}
        />
      ) : (
        <ShopCardEdit cancel={cancel} shop={shop} />
      )}
    </Card>
  );
};

ShopCard.propTypes = {
  confirm: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  shop: PropTypes.object.isRequired,
  ShopsStore: PropTypes.object.isRequired,
};

export default inject('ShopsStore')(
  WithConfirmAction(withSnackbar(ShopCard)),
);
