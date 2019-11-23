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
import ShopCreateForm from '../ShopCreateForm';
import validate from '../../services/validate';
import { LOAD_STATES } from '../../../../config/constants';

const Index = ({
  enqueueSnackbar,
  ShopsStore: { addShop, addShopState },
}) => {
  const [open, setOpen] = React.useState(false);
  const initialValues = {
    files: '',
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
      bodyFormData.append('shopImage', files[0]);

    const state = await addShop(bodyFormData);

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
          Добавить магазин
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Добавить магазин
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {props => (
            <ShopCreateForm
              {...props}
              addShopState={addShopState}
              handleClose={handleClose}
            />
          )}
        </Formik>
      </Dialog>
    </>
  );
};

Index.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  ShopsStore: PropTypes.object.isRequired,
};

export default inject('ShopsStore')(withSnackbar(observer(Index)));
