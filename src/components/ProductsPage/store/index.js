import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import {
  createProduct,
  getProductById,
  getProductsList,
  deleteProductById,
  updateProduct,
} from '../../../resources/api';

let lastGetParams = null;

const Product = types.model('Product', {
  _id: types.string,
  name: types.string,
  description: types.optional(types.maybeNull(types.string), null),
  brand: types.optional(types.maybeNull(types.string), null),
  bocoArticle: types.optional(types.maybeNull(types.string), null), //types.optional(types.string, ''),
  category: types.optional(types.maybeNull(types.string), null),
  image: types.optional(types.maybeNull(types.string), null),
  height: types.optional(types.maybeNull(types.number), null),
  width: types.optional(types.maybeNull(types.number), null),
  area: types.optional(types.maybeNull(types.number), null),
  weight: types.optional(types.maybeNull(types.number), null),
  volumeL: types.optional(types.maybeNull(types.number), null),
  volumeM: types.optional(types.maybeNull(types.number), null),
  thickness: types.optional(types.maybeNull(types.number), null),
});

export default types
  .model('ProductsStore', {
    products: types.array(Product),
    countProducts: types.optional(
      types.maybeNull(types.number),
      null,
    ),
    currentProduct: types.optional(types.frozen(), null),
    loadState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
    deleteProductState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
    addProductState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
    editProductState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
  })
  .actions(self => {
    const getProducts = flow(function* getProducts(params) {
      self.loadState = LOAD_STATES.PENDING;
      try {

        console.log('PARAMS >>>>>>', params);

        const {
          data: { list, count },
        } = yield getProductsList(params);
        lastGetParams = params;

        console.log('PROD LIST >>>>>>>>>', list);
        self.products = list;
        self.countProducts = count;
        self.loadState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('GET PRODUCTS LIST ERROR: ', error);
        self.loadState = LOAD_STATES.ERROR;
      }
    });

    const getProductItem = flow(function* getProductItem(id) {
      self.getProductState = LOAD_STATES.PENDING;
      try {
        const res = yield getProductById(id);
        self.currentProduct =
          res && res.data ? res.data.product : null;
        self.getProductState = LOAD_STATES.DONE;
        return res && res.data ? res.data.product : false;
      } catch (error) {
        console.error('GET PRODUCT BY ID ERROR: ', error);
        self.getProductState = LOAD_STATES.ERROR;
      }
      return self.getProductState;
    });

    const addProduct = flow(function* addProduct(params) {
      self.addProductState = LOAD_STATES.PENDING;
      try {
        const res = yield createProduct(params);
        self.addProductState = LOAD_STATES.DONE;
        return res && res.data ? res.data.id : false;
      } catch (error) {
        console.error('CREATE PRODUCT ERROR: ', error);
        self.addProductState = LOAD_STATES.ERROR;
        return false;
      }
    });

    const deleteProduct = flow(function* deleteProduct(id) {
      self.deleteProductState = LOAD_STATES.PENDING;
      try {
        yield deleteProductById(id);
        yield getProducts(lastGetParams);
        self.deleteProductState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('DELETE PRODUCT ERROR: ', error);
        self.deleteProductState = LOAD_STATES.ERROR;
      }
      return self.deleteProductState;
    });

    const editProduct = flow(function* editProduct(id, data) {
      self.editProductState = LOAD_STATES.PENDING;
      try {
        yield updateProduct(id, data);
        yield getProductItem(id);
        self.editProductState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('EDIT PRODUCT ERROR: ', error);
        self.editProductState = LOAD_STATES.ERROR;
      }
      return self.editProductState;
    });

    return {
      addProduct,
      getProductItem,
      getProducts,
      deleteProduct,
      editProduct,
    };
  });
