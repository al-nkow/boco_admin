import { isValidEmail } from '../../../../../config/constants';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Это поле обязательно для заполнения!';
  }
  if (!values.password) {
    errors.password = 'Это поле обязательно для заполнения!';
  } else if (values.password.length < 6) {
    errors.password = 'Пароль должен быть не менее 6 символов';
  }
  if (!values.email) {
    errors.email = 'Это поле обязательно для заполнения!';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Неправильный формат адреса';
  }
  return errors;
};

export default validate;
