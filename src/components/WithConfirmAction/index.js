import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const defer = () => {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};

const WithConfirmAction = Component => {
  return function WithConfirmActionBase(props) {
    const [options, setOptions] = useState({
      title: 'Подтвердите действие',
      message: 'Your message here',
      open: false,
      defer: null,
    });

    const perform = async settings => {
      const newDefer = defer();
      await setOptions({
        ...options,
        ...settings,
        open: true,
        defer: newDefer,
      });
      return newDefer.promise;
    };

    const handleClose = () => {
      setOptions({
        ...options,
        open: false,
        defer: null,
      });
    };

    const cancel = () => {
      options.defer.reject();
      handleClose();
    };

    const accept = () => {
      options.defer.resolve();
      handleClose();
    };

    const { open, title, message } = options;
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancel} color="primary">
              Нет
            </Button>
            <Button onClick={accept} color="primary">
              Да
            </Button>
          </DialogActions>
        </Dialog>
        <Component {...props} confirm={perform} />
      </div>
    );
  };
};

export default WithConfirmAction;
