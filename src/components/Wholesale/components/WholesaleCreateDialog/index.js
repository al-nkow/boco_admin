import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import * as PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik } from 'formik';
import { withSnackbar } from 'notistack';
import WholesaleCreateForm from '../WholesaleCreateForm';
import validate from '../../services/validate';
import { LOAD_STATES } from '../../../../config/constants';

const WholesaleCreateDialog = ({
  enqueueSnackbar,
  WholesaleStore: {
    addWholesale,
    addWholesaleState,
    restoreAddWholesaleState,
  },
}) => {
  const [open, setOpen] = React.useState(false);
  const initialValues = {
    key: '',
    name: '',
    comments: '',
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async values => {
    await addWholesale(values);
  };

  useEffect(() => {
    if (addWholesaleState === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при добавлении оптового параметра', {
        variant: 'error',
      });
    } else if (addWholesaleState === LOAD_STATES.DONE) {
      enqueueSnackbar('Оптовый параметр успешно добавлен', {
        variant: 'success',
      });
      handleClose();
    }
    restoreAddWholesaleState();
  }, [enqueueSnackbar, addWholesaleState, restoreAddWholesaleState]);

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
          Добавить оптовый параметр
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Добавить оптовый параметр
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {props => (
            <WholesaleCreateForm
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
              addWholesaleState={addWholesaleState}
              handleClose={handleClose}
            />
          )}
        </Formik>
      </Dialog>
    </>
  );
};

WholesaleCreateDialog.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  WholesaleStore: PropTypes.object.isRequired,
};

export default inject('WholesaleStore')(
  withSnackbar(observer(WholesaleCreateDialog)),
);
