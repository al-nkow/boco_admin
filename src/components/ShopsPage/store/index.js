import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import {
  createShop,
  getShopsList,
  deleteShopById,
  updateShop,
} from '../../../resources/api';

const Shop = types.model('Shop', {
  _id: types.string,
  key: types.string,
  name: types.string,
  image: types.string,
  comments: types.optional(types.string, ''),
});

export default types
  .model('ShopsStore', {
    shops: types.array(Shop),
    loadState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
    deleteShopState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
    addShopState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
    editShopState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
  })
  .actions(self => {
    const getShops = flow(function* getShops() {
      self.loadState = LOAD_STATES.PENDING;
      try {
        const { data } = yield getShopsList();
        self.shops = data.list;
        self.loadState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('GET SHOPS ERROR: ', error);
        self.loadState = LOAD_STATES.ERROR;
      }
    });

    const addShop = flow(function* addShop(params) {
      self.addShopState = LOAD_STATES.PENDING;
      try {
        yield createShop(params);
        yield getShops();
        self.addShopState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('CREATE SHOP ERROR: ', error);
        self.addShopState = LOAD_STATES.ERROR;
      }
      return self.addShopState;
    });

    const deleteShop = flow(function* deleteShop(id) {
      self.deleteShopState = LOAD_STATES.PENDING;
      try {
        yield deleteShopById(id);
        yield getShops();
        self.deleteShopState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('DELETE SHOP ERROR: ', error);
        self.deleteShopState = LOAD_STATES.ERROR;
      }
      return self.deleteShopState;
    });

    const editShop = flow(function* editShop(id, shopData) {
      self.editShopState = LOAD_STATES.PENDING;
      try {
        yield updateShop(id, shopData);
        yield getShops();
        self.editShopState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('EDIT SHOP ERROR: ', error);
        self.editShopState = LOAD_STATES.ERROR;
      }
      return self.editShopState;
    });

    return {
      addShop,
      getShops,
      deleteShop,
      editShop,
    };
  });
