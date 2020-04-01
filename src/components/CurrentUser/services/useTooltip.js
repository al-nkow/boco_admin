import { LOAD_STATES } from '../../../config/constants';

function useTooltip(enqueueSnackbar) {
  return (state, successMsg, errorMsg) => {
    if (state === LOAD_STATES.ERROR) {
      enqueueSnackbar(errorMsg, {
        variant: 'error',
      });
    } else if (state === LOAD_STATES.DONE) {
      enqueueSnackbar(successMsg, {
        variant: 'success',
      });
    }
  };
}

export default useTooltip;
