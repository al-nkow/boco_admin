import React, { useState } from 'react';
import { inject } from 'mobx-react';
import { withSnackbar } from 'notistack';
import ShopsTableRowView from './ShopsTableRowView';
import ShopsTableRowEdit from './ShopsTableRowEdit';
import WithConfirmAction from '../../WithConfirmAction';
import { LOAD_STATES } from '../../../config/constants';

const ShopsTableRow = ({
  shop,
  confirm,
  enqueueSnackbar,
  ShopsStore: { deleteShop },
}) => {
  const [edit, setEdit] = useState(false);
  const setEditMode = value => setEdit(value);

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

  return edit ? (
    <ShopsTableRowEdit
      setEditMode={setEditMode}
      shop={shop}
    />
  ) : (
    <ShopsTableRowView
      setEditMode={() => setEditMode(true)}
      shop={shop}
      askDeleteShop={askDeleteShop}
    />
  );
};

export default inject('ShopsStore')(
  WithConfirmAction(withSnackbar(ShopsTableRow)),
);
