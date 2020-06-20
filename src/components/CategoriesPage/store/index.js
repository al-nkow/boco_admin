/* eslint-disable no-console */
import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import {
  createCategory,
  getCategoriesList,
  deleteCategoryById,
  getCategoryById,
  updateCategory,
} from '../../../resources/api';

const Category = types.model('Category', {
  _id: types.string,
  name: types.string,
  image: types.optional(types.string, ''),
  comments: types.optional(types.string, ''),
});

export default types
  .model('CategoriesStore', {
    categories: types.array(Category),
    currentCategory: types.optional(types.frozen(), null),
    loadState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
    deleteCategoryState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
    addCategoryState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
    editCategoryState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
  })
  .actions(self => {
    const getCategories = flow(function* getCategories() {
      self.loadState = LOAD_STATES.PENDING;
      try {
        const { data } = yield getCategoriesList();
        self.categories = data.list;
        self.loadState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('GET CATEGORIES ERROR: ', error);
        self.loadState = LOAD_STATES.ERROR;
      }
    });

    const addCategory = flow(function* addCategory(data) {
      self.addCategoryState = LOAD_STATES.PENDING;
      try {
        yield createCategory(data);
        yield getCategories();
        self.addCategoryState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('CREATE CATEGORY ERROR: ', error);
        self.addCategoryState = LOAD_STATES.ERROR;
      }
      return self.addCategoryState;
    });

    const deleteCategory = flow(function* deleteCategory(id) {
      self.deleteCategoryState = LOAD_STATES.PENDING;
      try {
        yield deleteCategoryById(id);
        yield getCategories();
        self.deleteCategoryState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('DELETE CATEGORY ERROR: ', error);
        self.deleteCategoryState = LOAD_STATES.ERROR;
      }
      return self.deleteCategoryState;
    });

    const editCategory = flow(function* editCategory(id, data) {
      self.editCategoryState = LOAD_STATES.PENDING;
      try {
        yield updateCategory(id, data);
        yield getCategories();
        self.editCategoryState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('EDIT CATEGORY ERROR: ', error);
        self.editCategoryState = LOAD_STATES.ERROR;
      }
      return self.editCategoryState;
    });

    const getCategoryItem = flow(function* getCategoryItem(id) {
      self.getCategoryState = LOAD_STATES.PENDING;
      try {
        const res = yield getCategoryById(id);
        self.currentCategory =
          res && res.data ? res.data.category : null;
        self.getCategoryState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('GET PRODUCT BY ID ERROR: ', error);
        self.getCategoryState = LOAD_STATES.ERROR;
      }
      return self.getCategoryState;
    });

    return {
      addCategory,
      getCategories,
      deleteCategory,
      editCategory,
      getCategoryItem,
    };
  });
