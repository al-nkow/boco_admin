import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import {
  createWholesaleOption,
  getWholesaleList,
  deleteWholesaleOptionById,
  updateWholesale,
} from '../../../resources/api';

const WholesaleOption = types.model('Shop', {
  _id: types.string,
  key: types.string,
  name: types.string,
  comments: types.optional(types.string, ''),
});

export default types
  .model('WholesaleStore', {
    list: types.array(WholesaleOption),
    loadWholesaleState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
    deleteWholesaleState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
    addWholesaleState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.LOADING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
    editWholesaleState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
  })
  .actions(self => {
    const restoreAddWholesaleState = () => {
      self.addWholesaleState = LOAD_STATES.PENDING;
    };
    const restoreDeleteWholesaleState = () => {
      self.deleteWholesaleState = LOAD_STATES.PENDING;
    };
    const restoreEditWholesaleState = () => {
      self.editWholesaleState = LOAD_STATES.PENDING;
    };

    const getWholesale = flow(function* getShops() {
      self.loadWholesaleState = LOAD_STATES.PENDING;
      try {
        const { data } = yield getWholesaleList();
        self.list = data.list;
        self.loadWholesaleState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('GET WHOLESALE OPTIONS ERROR: ', error);
        self.loadWholesaleState = LOAD_STATES.ERROR;
      }
    });

    const addWholesale = flow(function* addWholesale(params) {
      self.addWholesaleState = LOAD_STATES.LOADING;
      try {
        yield createWholesaleOption(params);
        yield getWholesale();
        self.addWholesaleState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('CREATE WHOLESALE OPTION ERROR: ', error);
        self.addWholesaleState = LOAD_STATES.ERROR;
      }
    });

    const deleteWholesale = flow(function* deleteWholesale(id) {
      self.deleteWholesaleState = LOAD_STATES.PENDING;
      try {
        yield deleteWholesaleOptionById(id);
        yield getWholesale();
        self.deleteWholesaleState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('DELETE WHOLESALE OPTION ERROR: ', error);
        self.deleteWholesaleState = LOAD_STATES.ERROR;
      }
    });

    const editWholesale = flow(function* editShop(id, data) {
      self.editWholesaleState = LOAD_STATES.PENDING;
      try {
        yield updateWholesale(id, data);
        yield getWholesale();
        self.editWholesaleState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('EDIT WHOLESALE OPTION ERROR: ', error);
        self.editWholesaleState = LOAD_STATES.ERROR;
      }
      return self.editWholesaleState;
    });

    return {
      restoreAddWholesaleState,
      restoreDeleteWholesaleState,
      restoreEditWholesaleState,
      addWholesale,
      getWholesale,
      deleteWholesale,
      editWholesale,
    };
  });
