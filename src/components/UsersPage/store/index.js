import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import { getUsersList } from '../../../resources/api';
import { saveToken } from '../../../resources/services/APIService';
import history from '../../../history';

// const initFormData = {
//   email: 'admin@admin.com',
//   password: 'qwerty',
// };

// const initFormErrors = {
//   emailError: '',
//   passwordError: '',
// };

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
    // loginFormValues: types.optional(types.frozen(), initFormData),
    // loginFormErrors: types.optional(types.frozen(), initFormErrors),
  })
  .actions(self => ({


    getUsers: flow(function* getUsers() {
      try {
        const { data } = yield getUsersList();
        console.log('getUsers >>>>>>', data.users);
        self.users = data.users;
      } catch (error) {
        console.error('GET USERS ERROR: ', error);
      }
    }),





    // login: flow(function* exchange(params) {
    //   self.loadState = LOAD_STATES.PENDING;
    //   try {
    //     const { data } = yield login(params);
    //     if (data) {
    //       saveToken(data);
    //       history.push('/');
    //     }
    //     self.loadState = LOAD_STATES.DONE;
    //   } catch (error) {
    //     self.loadState = LOAD_STATES.ERROR;
    //   }
    // }),
    // setLoginFormValues(newParams) {
    //   self.loginFormValues = {
    //     ...self.loginFormValues,
    //     ...newParams,
    //   };
    // },
    // setLoginFormErrors(newParams) {
    //   self.loginFormErrors = {
    //     ...self.loginFormErrors,
    //     ...newParams,
    //   };
    // },
  }));
