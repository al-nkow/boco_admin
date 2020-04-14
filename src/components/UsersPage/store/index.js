import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import {
  getUsersList,
  deleteUserById,
  registerUser,
} from '../../../resources/api';

const User = types.model('User', {
  email: types.string,
  name: types.string,
  _id: types.string,
  avatar: types.optional(types.maybeNull(types.string), null),
});

export default types
  .model('UsersStore', {
    users: types.array(User),
    loadState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
    deleteUserState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
    saveUserState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.PENDING,
    ),
    saveUserError: types.optional(types.string, ''),
  })
  .actions(self => ({
    restoreDeleteUserState() {
      self.deleteUserState = LOAD_STATES.PENDING;
    },
    restoreSaveUserState() {
      self.saveUserState = LOAD_STATES.PENDING;
    },
    getUsers: flow(function* getUsers() {
      try {
        const { data } = yield getUsersList();
        self.users = data.users;
      } catch (error) {
        console.error('GET USERS ERROR: ', error);
      }
    }),
    deleteUser: flow(function* deleteUser(id) {
      self.deleteUserState = LOAD_STATES.PENDING;
      try {
        yield deleteUserById(id);
        const { data } = yield getUsersList();
        self.users = data.users;
        self.deleteUserState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('DELETE USER ERROR: ', error);
        self.deleteUserState = LOAD_STATES.ERROR;
      }
    }),
    addUser: flow(function* addUser(params) {
      self.saveUserError = '';
      self.saveUserState = LOAD_STATES.PENDING;
      try {
        yield registerUser(params);
        const { data } = yield getUsersList();
        self.users = data.users;
        self.saveUserState = LOAD_STATES.DONE;
      } catch (error) {
        console.error('SAVE USER ERROR:', error, error.response);
        const {
          response: { status },
        } = error;
        if (status === 409)
          self.saveUserError =
            'Пользователь с таким email уже зарегистрирован';
        self.saveUserState = LOAD_STATES.ERROR;
      }
    }),
  }));
