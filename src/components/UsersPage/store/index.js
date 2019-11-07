import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import { getUsersList, deleteUserById } from '../../../resources/api';

const User = types.model('User', {
  email: types.string,
  name: types.string,
  _id: types.string,
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
  })
  .actions(self => ({
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
  }));
