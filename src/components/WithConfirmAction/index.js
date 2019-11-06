import React from 'react';
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
  class WithConfirmActionBase extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: 'Подтвердите действие',
        message: 'Your message here',
        open: false,
        defer: null,
      };
    }

    confirm = async options => {
      await this.setState({
        ...this.state,
        ...options,
        open: true,
        defer: defer(),
      });
      return this.state.defer.promise;
    };

    handleClose = () => {
      this.setState({
        ...this.state,
        open: false,
        defer: null,
      });
    };

    cancel = () => {
      this.state.defer.reject();
      this.handleClose();
    };

    accept = () => {
      this.state.defer.resolve();
      this.handleClose();
    };

    render() {
      const { open, title, message } = this.state;
      return (
        <div>
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.cancel} color="primary">
                Нет
              </Button>
              <Button onClick={this.accept} color="primary">
                Да
              </Button>
            </DialogActions>
          </Dialog>
          <Component {...this.props} confirm={this.confirm} />
        </div>
      );
    }
  }

  return WithConfirmActionBase;
};

export default WithConfirmAction;
