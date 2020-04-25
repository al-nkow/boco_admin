import { LOAD_STATES } from '../../../../../config/constants';

function usePositionFormSubmit(
  _id,
  shopId,
  productId,
  addPosition,
  editPosition,
  enqueueSnackbar,
  cancel,
) {
  const createNewPosition = async data => {
    const id = await addPosition(data);
    if (id) {
      enqueueSnackbar(`Товар успешно добавлен в магазин`, {
        variant: 'success',
      });
      cancel();
    } else {
      enqueueSnackbar('Ошибка при добавлении ассортимента магазина', {
        variant: 'error',
      });
    }
  };

  const updatePosition = async data => {
    const state = await editPosition(_id, data);
    if (state === LOAD_STATES.DONE) {
      enqueueSnackbar('Позиция успешно отредактирована', {
        variant: 'success',
      });
      cancel();
    } else {
      enqueueSnackbar(
        'Ошибка при редактировании ассортимента магазина',
        { variant: 'error' },
      );
    }
  };

  const onSubmit = values => {
    const data = {
      ...values,
      shopId,
      productId,
    };

    if (!_id) {
      createNewPosition(data);
    } else {
      updatePosition(data);
    }
  };

  return {
    onSubmit,
  };
}

export default usePositionFormSubmit;
