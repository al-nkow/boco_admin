import { types, flow } from 'mobx-state-tree';
import { LOAD_STATES } from '../../../config/constants';
import { login } from '../../../resources/api';
import { saveToken } from '../../../resources/services/APIService';
import history from '../../../history';

const initFormData = {
  email: 'tamir83@mail.ru',
  password: 'Gfhjkm83',
};

const initFormErrors = {
  emailError: '',
  passwordError: '',
};

export default types
  .model('LoginStore', {
    loadState: types.optional(
      types.enumeration('State', [
        LOAD_STATES.PENDING,
        LOAD_STATES.DONE,
        LOAD_STATES.ERROR,
      ]),
      LOAD_STATES.DONE,
    ),
    loginFormValues: types.optional(types.frozen(), initFormData),
    loginFormErrors: types.optional(types.frozen(), initFormErrors),
  })
  .actions(self => ({
    login: flow(function* exchange(params) {
      self.loadState = LOAD_STATES.PENDING;
      try {
        const { data } = yield login(params);
        if (data) {
          saveToken(data);
          history.push('/');
        }
        self.loadState = LOAD_STATES.DONE;
      } catch (error) {
        self.loadState = LOAD_STATES.ERROR;
      }
    }),
    setLoginFormValues(newParams) {
      self.loginFormValues = {
        ...self.loginFormValues,
        ...newParams,
      };
    },
    setLoginFormErrors(newParams) {
      self.loginFormErrors = {
        ...self.loginFormErrors,
        ...newParams,
      };
    },
  }));
