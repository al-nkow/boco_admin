import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import {
  createCategory,
  getCategoriesList,
  deleteCategoryById,
  updateCategory,
} from '../../../resources/api';

const Category = types.model('Category', {
  _id: types.string,
  name: types.string,
  comments: types.optional(types.string, ''),
});

export default types
  .model('CategoriesStore', {
    categories: types.array(Category),
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

    const addCategory = flow(function* addCategory(params) {
      self.addCategoryState = LOAD_STATES.PENDING;
      try {
        yield createCategory(params);
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

    return {
      addCategory,
      getCategories,
      deleteCategory,
      editCategory,
    };
  });
