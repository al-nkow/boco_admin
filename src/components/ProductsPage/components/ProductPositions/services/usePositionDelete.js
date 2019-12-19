import { LOAD_STATES } from '../../../../../config/constants';

function useDeletePosition(
  enqueueSnackbar,
  confirm,
  deletePosition,
  _id,
  article,
) {
  const performDeletePosition = async () => {
    const deleteState = await deletePosition(_id);
    if (deleteState === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при попытке удалить позицию', {
        variant: 'error',
      });
    } else if (deleteState === LOAD_STATES.DONE) {
      enqueueSnackbar('Позиция успешно удалёна из магазина', {
        variant: 'success',
      });
    }
  };

  const confirmDeletePosition = () => {
    confirm({
      message: `Вы уверены что хотите удалить позицию ${article}? 
      Это действие невозможно будет отменить.`,
    })
      .then(() => {
        performDeletePosition();
      })
      .catch(() => {
        console.log('Delete action canceled by user');
      });
  };

  return {
    confirmDeletePosition,
  };
}

export default useDeletePosition;
