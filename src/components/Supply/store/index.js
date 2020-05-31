import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';

import {
  getSupplyList,
  getWholesaleList,
} from '../../../resources/api';

const Supply = types.model('Supply', {
  _id: types.string,
  productId: types.string,
  options: types.maybeNull(types.array(types.frozen())),
});

export default types
  .model('SupplyStore', {
    list: types.array(Supply),
    currentSupply: types.optional(types.frozen(), null),
    loadState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
  })
  .actions(self => {
    const getSupplies = flow(function* getProducts(params) {
      self.loadState = LOAD_STATES.PENDING;
      try {
        const data = yield getSupplyList(params);
        self.list = data.data.list;
        self.loadState = LOAD_STATES.DONE;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('GET SUPPLIES ERROR: ', error);
        self.loadState = LOAD_STATES.ERROR;
      }
    });

    const getCurrentSupply = flow(function* getCurrentSupply(
      productId,
    ) {
      try {
        const data = yield getSupplyList({ productId });
        const currentSupply = data.data.list[0];
        const wholesale = yield getWholesaleList();
        const wholesaleList = wholesale.data.list;

        currentSupply.options.forEach(option => {
          const wsItem = wholesaleList.find(
            // eslint-disable-next-line no-underscore-dangle
            item => item._id === option.wholesaleId,
          );
          option.wholesaleName = wsItem.name;
        });
        // eslint-disable-next-line prefer-destructuring
        self.currentSupply = currentSupply;
        self.loadState = LOAD_STATES.DONE;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('GET CURRENT SUPPLY ERROR: ', error);
        self.loadState = LOAD_STATES.ERROR;
      }
    });

    return {
      getSupplies,
      getCurrentSupply,
    };
  });
