import { flow, types } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import {
  clearAllProductsAndPositions,
  saveImportedData,
} from '../../../resources/api';

export default types
  .model('ImportStore', {
    importedData: types.optional(
      types.maybeNull(types.array(types.frozen())),
      null,
    ),
    deleteAllState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
    publishState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
  })
  .actions(self => {
    const setImportedData = data => {
      console.log('CLEAR?? >>>>>>', data);
      self.importedData = data;
    };

    const publishData = flow(function* publishData() {
      self.publishState = LOAD_STATES.PENDING;

      // FORMAT DATA HERE

      try {
        yield saveImportedData();
        self.publishState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('PUBLISH IMPORTED DATA ERROR: ', error);
        self.publishState = LOAD_STATES.ERROR;
      }
      // return self.publishState;
    });

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
      setImportedData,
      publishData,
    };
  });
