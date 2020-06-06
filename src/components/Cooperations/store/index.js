import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';

import {
  getCooperationsList,
  deleteCooperationById,
} from '../../../resources/api';

const Cooperation = types.model('Cooperation', {
  _id: types.string,
  expireAt: types.string,
  bocoArticle: types.string,
  orgName: types.string,
  inn: types.string,
  fizName: types.string,
  email: types.string,
  phone: types.string,
  amount: types.string,
  dateTo: types.string,
  comments: types.string,
  orgOnly: types.boolean,
  mailOnly: types.boolean,
});

export default types
  .model('CooperationStore', {
    list: types.array(Cooperation),
    allAmount: types.optional(types.number, 0),
    loadState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
    deleteState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
  })
  .actions(self => {
    const getCooperationsForProduct = flow(function* getCooperations(
      params,
    ) {
      if (!params.bocoArticle) {
        self.list = [];
        self.allAmount = 0;
      } else {
        self.loadState = LOAD_STATES.PENDING;
        try {
          const data = yield getCooperationsList(params);
          const { list } = data.data;
          self.list = list;
          self.allAmount = list.reduce((res, item) => {
            return res + +item.amount;
          }, 0);
          self.loadState = LOAD_STATES.DONE;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('GET COOPERATIONS ERROR: ', error);
          self.loadState = LOAD_STATES.ERROR;
        }
      }
    });

    const deleteCooperation = flow(function* deleteCooperation(
      id,
      bocoArticle,
    ) {
      self.deleteState = LOAD_STATES.PENDING;
      try {
        yield deleteCooperationById(id);
        yield getCooperationsForProduct({ bocoArticle });
        self.deleteState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('DELETE COOPERATION ERROR: ', error);
        self.deleteState = LOAD_STATES.ERROR;
      }
      return self.deleteState;
    });

    return {
      getCooperationsForProduct,
      deleteCooperation,
    };
  });
