const validate = values => {
  const errors = {};
  const priceRegex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;

  if (!values.article) {
    errors.article = 'Это поле обязательно для заполнения!';
  }
  if (!values.price) {
    errors.price = 'Это поле обязательно для заполнения!';
  }
  if (!priceRegex.test(values.price)) {
    errors.price = 'Недопустимый формат цены - 123.99';
  }
  if (!values.link) {
    errors.link = 'Это поле обязательно для заполнения!';
  }
  return errors;
};

export default validate;
