import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import {
  createPosition,
  getPositionsList,
  deletePositionById,
  updatePosition,
  getProductsList,
  getShopsList,
} from '../../../resources/api';

let lastGetParams = null;

const Position = types.model('Position', {
  _id: types.string,
  article: types.string,
  price: types.number,
  link: types.string,
  productId: types.string,
  shopId: types.string,
  product: types.optional(types.frozen(), null),
  shop: types.optional(types.frozen(), null),
});

export default types
  .model('PositionsStore', {
    positions: types.array(Position),
    countPositions: types.optional(
      types.maybeNull(types.number),
      null,
    ),
    loadState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
    deletePositionState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
    addPositionState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
    editPositionState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
  })
  .actions(self => {
    const getPositions = flow(function* getPositions(params) {
      self.loadState = LOAD_STATES.PENDING;
      try {
        const {
          data: { list, count },
        } = yield getPositionsList(params);
        lastGetParams = params;

        const productIds = list.reduce((res, item) => {
          const { productId } = item;
          if (res.indexOf(productId) === -1) res.push(productId);
          return res;
        }, []);

        const shopIds = list.reduce((res, item) => {
          const { shopId } = item;
          if (res.indexOf(shopId) === -1) res.push(shopId);
          return res;
        }, []);

        if (shopIds && shopIds.length) {
          const shops = yield getShopsList({ id: shopIds });

          if (shops && shops.data && shops.data.list) {
            list.forEach(position => {
              position.shop = shops.data.list.find(
                shop => shop._id === position.shopId,
              );
            });
          }
        }

        if (productIds && productIds.length) {
          const products = yield getProductsList({ id: productIds });

          if (products && products.data && products.data.list) {
            list.forEach(position => {
              position.product = products.data.list.find(
                product => product._id === position.productId,
              );
            });
          }
        }

        self.positions = list;
        self.countPositions = count;
        self.loadState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('GET PRODUCTS LIST ERROR: ', error);
        self.loadState = LOAD_STATES.ERROR;
      }
    });

    const addPosition = flow(function* addPosition(params) {
      self.addProductState = LOAD_STATES.PENDING;
      try {
        const res = yield createPosition(params);
        self.addPositionState = LOAD_STATES.DONE;
        yield getPositions(lastGetParams);
        return res && res.data ? res.data.id : false;
      } catch (error) {
        console.error('CREATE POSITION ERROR: ', error);
        self.addPositionState = LOAD_STATES.ERROR;
        return false;
      }
    });

    const deletePosition = flow(function* deletePosition(id) {
      self.deletePositionState = LOAD_STATES.PENDING;
      try {
        yield deletePositionById(id);
        yield getPositions(lastGetParams);
        self.deletePositionState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('DELETE POSITION ERROR: ', error);
        self.deletePositionState = LOAD_STATES.ERROR;
      }
      return self.deletePositionState;
    });

    const editPosition = flow(function* editPosition(id, data) {
      self.editPositionState = LOAD_STATES.PENDING;
      try {
        yield updatePosition(id, data);
        yield getPositions(lastGetParams);
        self.editPositionState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('EDIT POSITION ERROR: ', error);
        self.editPositionState = LOAD_STATES.ERROR;
      }
      return self.editPositionState;
    });

    return {
      addPosition,
      getPositions,
      deletePosition,
      editPosition,
    };
  });
