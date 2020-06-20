/* eslint-disable no-console */
import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import {
  getCurrentUserInfo,
  updateCurrentUserInfo,
  updateCurrentUserPassword,
} from '../../../resources/api';

export default types
  .model('CurrentUserStore', {
    name: types.optional(types.maybeNull(types.string), null),
    email: types.optional(types.maybeNull(types.string), null),
    avatar: types.optional(types.maybeNull(types.string), null),
    updateUserState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
    changePasswordState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
    loadState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
  })
  .actions(self => ({
    getCurrentUser: flow(function* getCurrentUser() {
      self.loadState = LOAD_STATES.PENDING;
      try {
        const res = yield getCurrentUserInfo();
        const { name, email, avatar } = res.data.user;
        self.name = name;
        self.email = email;
        self.avatar = avatar;
        self.loadState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('GET CURRENT USER ERROR: ', error);
        self.loadState = LOAD_STATES.ERROR;
      } 
    }),
    updateMe: flow(function* updateMe(data) {
      self.updateUserState = LOAD_STATES.PENDING;
      try {
        const res = yield updateCurrentUserInfo(data);
        if (res && res.data && res.data.data) {
          const { name, avatar } = res.data.data;
          self.name = name;
          if (avatar) self.avatar = avatar;
        }
        self.updateUserState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('UPDATE CURRENT USER ERROR: ', error);
        self.updateUserState = LOAD_STATES.ERROR;
      }
      return self.updateUserState;
    }),
    changePassword: flow(function* changePassword(data) {
      self.changePasswordState = LOAD_STATES.PENDING;
      try {
        yield updateCurrentUserPassword(data);
        self.changePasswordState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('CHANGE USER PASSWORD ERROR: ', error);
        self.changePasswordState = LOAD_STATES.ERROR;
      }
      return self.changePasswordState;
    }),
  }));
