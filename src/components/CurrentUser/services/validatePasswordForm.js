const validate = values => {
  const errors = {};

  if (!values.oldPass) {
    errors.oldPass = 'Это поле обязательно для заполнения!';
  }

  if (!values.newPass) {
    errors.newPass = 'Это поле обязательно для заполнения!';
  }

  if (values.repeat && values.newPass.length < 6) {
    errors.newPass = 'Длина пароля не менее 6 символов!';
  }

  if (!values.repeat) {
    errors.repeat = 'Это поле обязательно для заполнения!';
  }

  if (values.newPass !== values.repeat) {
    errors.newPass = 'Значения полей не совпадают';
    errors.repeat = 'Значения полей не совпадают';
  }

  return errors;
};

export default validate;
