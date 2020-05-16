const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Это поле обязательно для заполнения!';
  }
  if (!values.key) {
    errors.key = 'Это поле обязательно для заполнения!';
  }
  return errors;
};

export default validate;
