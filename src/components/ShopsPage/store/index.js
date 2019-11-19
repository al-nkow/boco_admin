import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import {
  createShop,
  getShopsList,
  deleteShopById,
} from '../../../resources/api';

const Shop = types.model('Shop', {
  _id: types.string,
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
    // saveUserError: types.optional(types.string, ''),
  })
  .actions(self => ({
    addShop: flow(function* addShop(params) {
      self.addShopState = LOAD_STATES.PENDING;
      try {
        yield createShop(params);
        const { data } = yield getShopsList();
        self.shops = data.list;
        self.addShopState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('CREATE SHOP ERROR: ', error);
        self.addShopState = LOAD_STATES.ERROR;
      }
      return self.addShopState;
    }),
    getShops: flow(function* getShops() {
      try {
        const { data } = yield getShopsList();
        self.shops = data.list;
        console.log('response shops >>>>>>', data);
      } catch (error) {
        console.error('GET SHOPS ERROR: ', error);
      }
    }),
    // getUsers: flow(function* getUsers() {
    //   try {
    //     const { data } = yield getUsersList();
    //     self.users = data.users;
    //   } catch (error) {
    //     console.error('GET USERS ERROR: ', error);
    //   }
    // }),
    deleteShop: flow(function* deleteShop(id) {
      self.deleteShopState = LOAD_STATES.PENDING;
      try {
        yield deleteShopById(id);
        const { data } = yield getShopsList();
        self.shops = data.list;
        self.deleteShopState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('DELETE SHOP ERROR: ', error);
        self.deleteShopState = LOAD_STATES.ERROR;
      }
      return self.deleteShopState;
    }),
    // addUser: flow(function* addUser(params) {
    //   self.saveUserError = '';
    //   self.saveUserState = LOAD_STATES.PENDING;
    //   try {
    //     yield registerUser(params);
    //     const { data } = yield getUsersList();
    //     self.users = data.users;
    //     self.saveUserState = LOAD_STATES.DONE;
    //   } catch (error) {
    //     console.error('SAVE USER ERROR:', error, error.response);
    //     const {
    //       response: { status },
    //     } = error;
    //     if (status === 409)
    //       self.saveUserError =
    //         'Пользователь с таким email уже зарегистрирован';
    //     self.saveUserState = LOAD_STATES.ERROR;
    //   }
    // }),
  }));
