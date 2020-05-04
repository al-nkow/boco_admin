import { flow, types } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import {
  clearAllProductsAndPositions,
  saveImportedData,
} from '../../../resources/api';
import prepareImportData from '../services/prepareImportData';

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
      self.importedData = data;
    };

    const publishData = flow(function* publishData() {
      self.publishState = LOAD_STATES.PENDING;
      const data = prepareImportData(self.importedData);

      try {
        yield saveImportedData({ data });
        self.publishState = LOAD_STATES.DONE;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('PUBLISH IMPORTED DATA ERROR: ', error);
        self.publishState = LOAD_STATES.ERROR;
      }
      return self.publishState;
    });

    const deleteAllProducts = flow(function* deleteAllProducts() {
      self.deleteAllState = LOAD_STATES.PENDING;
      try {
        yield clearAllProductsAndPositions();
        self.deleteAllState = LOAD_STATES.DONE;
      } catch (error) {
        // eslint-disable-next-line no-console
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
