import { checkNameRegexp } from '../../../config/constants';

const validateUserData = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Это поле обязательно для заполнения!';
  }

  if (!values.name.match(checkNameRegexp)) {
    errors.name = 'Имя должно содержать только буквы';
  }

  return errors;
};

export default validateUserData;
