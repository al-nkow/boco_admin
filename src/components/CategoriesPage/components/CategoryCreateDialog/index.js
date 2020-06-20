/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { inject, observer } from 'mobx-react';
import * as PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik } from 'formik';
import { withSnackbar } from 'notistack';
import CategoryCreateForm from '../CategoryCreateForm';
import validate from '../../services/validate';
import { LOAD_STATES } from '../../../../config/constants';

const CategoryCreateDialog = ({
  enqueueSnackbar,
  CategoriesStore: { addCategory, addCategoryState },
}) => {
  const [open, setOpen] = React.useState(false);
  const initialValues = {
    name: '',
    comments: '',
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async values => {
    const { files, name, comments } = values;
    const bodyFormData = new FormData();

    bodyFormData.append('name', name);
    bodyFormData.append('comments', comments);

    if (files && files.length)
      bodyFormData.append('categoryImage', files[0]);

    const state = await addCategory(bodyFormData);

    if (state === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при добавлении магазина', {
        variant: 'error',
      });
    } else if (state === LOAD_STATES.DONE) {
      enqueueSnackbar('Магазин успешно добавлен', {
        variant: 'success',
      });
      handleClose();
    }
  };

  return (
    <>
      <Box mb={2}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Добавить категорию
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Добавить категорию товаров
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {props => (
            <CategoryCreateForm
              {...props}
              addCategoryState={addCategoryState}
              handleClose={handleClose}
            />
          )}
        </Formik>
      </Dialog>
    </>
  );
};

CategoryCreateDialog.propTypes = {
  CategoriesStore: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default inject('CategoriesStore')(
  withSnackbar(observer(CategoryCreateDialog)),
);
