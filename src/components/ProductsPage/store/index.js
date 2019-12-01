import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import {
  createProduct,
  getProductById,
  getProductsList,
  deleteProductById,
  // updateCategory,
} from '../../../resources/api';

const Product = types.model('Product', {
  _id: types.string,
  name: types.string,
  brand: types.optional(types.string, ''),
  bocoArticle: types.optional(types.string, ''),
  category: types.optional(types.string, ''),
  link: types.optional(types.string, ''),
  height: types.optional(types.maybeNull(types.number), null),
  width: types.optional(types.maybeNull(types.number), null),
  length: types.optional(types.maybeNull(types.number), null),
  value: types.optional(types.maybeNull(types.number), null),
  weight: types.optional(types.maybeNull(types.number), null),
  color: types.optional(types.string, ''),
});

export default types
  .model('ProductsStore', {
    products: types.array(Product),
    countProducts: types.optional(types.maybeNull(types.number), null),
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
        const { data } = yield getProductsList(params);
        self.products = data.list;
        self.countProducts = data.count;
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
        yield getProducts();
        self.deleteProductState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('DELETE PRODUCT ERROR: ', error);
        self.deleteProductState = LOAD_STATES.ERROR;
      }
      return self.deleteProductState;
    });

    // const editCategory = flow(function* editCategory(id, data) {
    //   self.editCategoryState = LOAD_STATES.PENDING;
    //   try {
    //     yield updateCategory(id, data);
    //     yield getCategories();
    //     self.editCategoryState = LOAD_STATES.DONE;
    //   } catch (error) {
    //     console.error('EDIT CATEGORY ERROR: ', error);
    //     self.editCategoryState = LOAD_STATES.ERROR;
    //   }
    //   return self.editCategoryState;
    // });

    return {
      addProduct,
      getProductItem,
      getProducts,
      // getCategories,
      deleteProduct,
      // editCategory,
    };
  });