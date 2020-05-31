import { types, flow } from 'mobx-state-tree';
import {
  LOAD_STATES,
  DEFAULT_PASSWORD,
  DEFAULT_EMAIL,
} from '../../../config/constants';
import { login } from '../../../resources/api';
import { saveToken } from '../../../resources/services/APIService';
import history from '../../../history';

const initFormData = {
  email: DEFAULT_EMAIL,
  password: DEFAULT_PASSWORD,
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
    login: flow(function* loginFunc(params, from) {
      self.loadState = LOAD_STATES.PENDING;
      try {
        const { data } = yield login(params);
        if (data) {
          saveToken(data);
          const path = from || '/';
          history.push(path);
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
