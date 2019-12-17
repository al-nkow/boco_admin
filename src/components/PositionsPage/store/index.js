import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import {
  createPosition,
  // getProductById,
  getPositionsList,
  // deleteProductById,
  // updateProduct,
} from '../../../resources/api';

const Position = types.model('Position', {
  _id: types.string,
  article: types.string,
  price: types.number,
  link: types.string,
  productId: types.string,
  shopId: types.string,
  // name: types.string,
  // brand: types.optional(types.string, ''),
  // bocoArticle: types.optional(types.string, ''),
  // category: types.optional(types.string, ''),
  // link: types.optional(types.string, ''),
  // height: types.optional(types.maybeNull(types.number), null),
  // width: types.optional(types.maybeNull(types.number), null),
  // length: types.optional(types.maybeNull(types.number), null),
  // value: types.optional(types.maybeNull(types.number), null),
  // weight: types.optional(types.maybeNull(types.number), null),
  // color: types.optional(types.string, ''),
});

export default types
  .model('PositionsStore', {
    positions: types.array(Position),
    countPositions: types.optional(types.maybeNull(types.number), null),
    // currentProduct: types.optional(types.frozen(), null),
    loadState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
    // deleteProductState: types.optional(
    //   types.enumeration('State', [
    //     LOAD_STATES.PENDING,
    //     LOAD_STATES.DONE,
    //     LOAD_STATES.ERROR,
    //   ]),
    //   LOAD_STATES.DONE,
    // ),
    addPositionState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
    // editProductState: types.optional(
    //   types.enumeration('State', [
    //     LOAD_STATES.PENDING,
    //     LOAD_STATES.DONE,
    //     LOAD_STATES.ERROR,
    //   ]),
    //   LOAD_STATES.DONE,
    // ),
  })
  .actions(self => {
    const getPositions = flow(function* getPositions(params) {
      self.loadState = LOAD_STATES.PENDING;
      try {
        const {
          data: { list, count },
        } = yield getPositionsList(params);
        // lastGetParams = params;
        self.positions = list;
        self.countPositions = count;
        self.loadState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('GET PRODUCTS LIST ERROR: ', error);
        self.loadState = LOAD_STATES.ERROR;
      }
    });

    // const getProductItem = flow(function* getProductItem(id) {
    //   self.getProductState = LOAD_STATES.PENDING;
    //   try {
    //     const res = yield getProductById(id);
    //     self.currentProduct =
    //       res && res.data ? res.data.product : null;
    //     self.getProductState = LOAD_STATES.DONE;
    //     return res && res.data ? res.data.product : false;
    //   } catch (error) {
    //     console.error('GET PRODUCT BY ID ERROR: ', error);
    //     self.getProductState = LOAD_STATES.ERROR;
    //   }
    //   return self.getProductState;
    // });

    const addPosition = flow(function* addPosition(params) {
      self.addProductState = LOAD_STATES.PENDING;
      try {
        const res = yield createPosition(params);
        self.addPositionState = LOAD_STATES.DONE;
        return res && res.data ? res.data.id : false;
      } catch (error) {
        console.error('CREATE POSITION ERROR: ', error);
        self.addPositionState = LOAD_STATES.ERROR;
        return false;
      }
    });

    // const deleteProduct = flow(function* deleteProduct(id) {
    //   self.deleteProductState = LOAD_STATES.PENDING;
    //   try {
    //     yield deleteProductById(id);
    //     yield getProducts(lastGetParams);
    //     self.deleteProductState = LOAD_STATES.DONE;
    //   } catch (error) {
    //     console.error('DELETE PRODUCT ERROR: ', error);
    //     self.deleteProductState = LOAD_STATES.ERROR;
    //   }
    //   return self.deleteProductState;
    // });
    //
    // const editProduct = flow(function* editProduct(id, data) {
    //   self.editProductState = LOAD_STATES.PENDING;
    //   try {
    //     yield updateProduct(id, data);
    //     yield getProductItem(id);
    //     self.editProductState = LOAD_STATES.DONE;
    //   } catch (error) {
    //     console.error('EDIT PRODUCT ERROR: ', error);
    //     self.editProductState = LOAD_STATES.ERROR;
    //   }
    //   return self.editProductState;
    // });

    return {
      addPosition,
      // getProductItem,
      getPositions,
      // deleteProduct,
      // editProduct,
    };
  });
