import { flow, types } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import { clearAllProductsAndPositions } from '../../../resources/api';

export default types
  .model('ImportStore', {
    deleteAllState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
  })
  .actions(self => {
    const deleteAllProducts = flow(function* deleteAllProducts() {
      self.deleteAllState = LOAD_STATES.PENDING;
      try {
        yield clearAllProductsAndPositions();
        self.deleteAllState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('DELETE ALL PRODUCTS ERROR: ', error);
        self.deleteAllState = LOAD_STATES.ERROR;
      }
      return self.deleteAllState;
    });

    return {
      deleteAllProducts,
    };
  });
