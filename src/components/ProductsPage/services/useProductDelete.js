import { LOAD_STATES } from '../../../config/constants';
import history from '../../../history';

function useDeleteProduct(
  enqueueSnackbar,
  confirm,
  deleteProduct,
  redirect,
) {
  const performDeleteProduct = async productId => {
    const deleteState = await deleteProduct(productId);
    if (deleteState === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при попытке удалить товар', {
        variant: 'error',
      });
    } else if (deleteState === LOAD_STATES.DONE) {
      enqueueSnackbar('Товар успешно удалён', {
        variant: 'success',
      });
      if (redirect) history.push(`/products`);
    }
  };

  const confirmDeleteProduct = selectedProduct => {
    confirm({
      message: `Вы уверены что хотите удалить товар "${selectedProduct.name}"? 
      Это действие невозможно будет отменить. Также это автоматически повлечёт за собой удаление
      этого товара из ассортимента всех магазинов.`,
    })
      .then(() => {
        performDeleteProduct(selectedProduct._id);
      })
      .catch(() => {
        console.log('Delete action canceled by user');
      });
  };

  return {
    confirmDeleteProduct,
  };
}

export default useDeleteProduct;
