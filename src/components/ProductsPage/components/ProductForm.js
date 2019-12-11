import React from 'react';
import * as PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { LOAD_STATES } from '../../../config/constants';

const ProductForm = ({
  categories,
  values,
  errors,
  touched,
  isValid,
  handleChange,
  handleBlur,
  handleSubmit,
  addProductState,
  cancel,
}) => {
  return (
    <>
      <Box mb={2}>
        <Paper>
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Наименование"
                  name="name"
                  value={values.name}
                  type="text"
                  fullWidth
                  helperText={
                    errors.name && touched.name ? errors.name : ''
                  }
                  error={errors.name && touched.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Марка (Производитель)"
                  name="brand"
                  value={values.brand}
                  type="text"
                  fullWidth
                  helperText={
                    errors.brand && touched.brand ? errors.brand : ''
                  }
                  error={errors.brand && touched.brand}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Артикул BOCO"
                  name="bocoArticle"
                  value={values.bocoArticle}
                  type="text"
                  fullWidth
                  helperText={
                    errors.bocoArticle && touched.bocoArticle
                      ? errors.bocoArticle
                      : ''
                  }
                  error={errors.bocoArticle && touched.bocoArticle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={6}>
                <Box mt={1}>
                  <FormControl
                    error={errors.category && touched.category}
                    fullWidth
                  >
                    <InputLabel id="product-form-category">
                      Категория
                    </InputLabel>
                    <Select
                      labelId="product-form-category"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {categories.map(item => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.category && touched.category ? (
                      <FormHelperText>
                        {errors.category}
                      </FormHelperText>
                    ) : (
                      ''
                    )}
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Ссылка на изображение"
                  name="link"
                  value={values.link}
                  type="text"
                  fullWidth
                  helperText={
                    errors.link && touched.link ? errors.link : ''
                  }
                  error={errors.link && touched.link}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
      <Box mb={2}>
        <Paper>
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Высота (мм)"
                  name="height"
                  value={values.height}
                  type="text"
                  fullWidth
                  helperText={
                    errors.height && touched.height
                      ? errors.height
                      : ''
                  }
                  error={errors.height && touched.height}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Ширина (мм)"
                  name="width"
                  value={values.width}
                  type="text"
                  fullWidth
                  helperText={
                    errors.width && touched.width ? errors.width : ''
                  }
                  error={errors.width && touched.width}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Длина (мм)"
                  name="length"
                  value={values.length}
                  type="text"
                  fullWidth
                  helperText={
                    errors.length && touched.length
                      ? errors.length
                      : ''
                  }
                  error={errors.length && touched.length}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Объем (л)"
                  name="value"
                  value={values.value}
                  type="text"
                  fullWidth
                  helperText={
                    errors.value && touched.value ? errors.value : ''
                  }
                  error={errors.value && touched.value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Вес (кг)"
                  name="weight"
                  value={values.weight}
                  type="text"
                  fullWidth
                  helperText={
                    errors.weight && touched.weight
                      ? errors.weight
                      : ''
                  }
                  error={errors.weight && touched.weight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Цвет"
                  name="color"
                  value={values.color}
                  type="text"
                  fullWidth
                  helperText={
                    errors.color && touched.color ? errors.color : ''
                  }
                  error={errors.color && touched.color}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
      <Grid container justify="flex-end">
        {cancel && (
          <Box mr={1}>
            <Button
              variant="contained"
              onClick={cancel}
              color="primary"
            >
              Отменить
            </Button>
          </Box>
        )}
        <Button
          variant="contained"
          onClick={handleSubmit}
          color="primary"
          disabled={
            !isValid || addProductState === LOAD_STATES.PENDING
          }
        >
          Сохранить
        </Button>
      </Grid>
    </>
  );
};

ProductForm.propTypes = {
  addProductState: PropTypes.string.isRequired,
  cancel: PropTypes.func,
  categories: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

ProductForm.defaultProps = {
  cancel: null,
};

export default observer(ProductForm);
