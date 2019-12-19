import React from 'react';
import * as PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import TableCell from '@material-ui/core/TableCell';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import WithConfirmAction from '../../../../WithConfirmAction';
import validatePositions from '../../../services/validatePositions';
import usePositionFormSubmit from '../services/usePositionFormSubmit';

const StyledTextField = styled(TextField)`
  &.MuiTextField-root {
    margin-top: 0;
    .MuiOutlinedInput-input {
      padding: 7px 10px;
      font-size: 14px;
    }
  }
`;

const ProductPositionsForm = ({
  cancel,
  productId,
  assortmentItem,
  PositionsStore: { addPosition, editPosition },
  enqueueSnackbar,
}) => {
  const { _id, article, price, link, shopId } = assortmentItem;
  const initialValues = {
    article: article || '',
    price: price || '',
    link: link || '',
  };

  const { onSubmit } = usePositionFormSubmit(
    _id,
    shopId,
    productId,
    addPosition,
    editPosition,
    enqueueSnackbar,
    cancel,
  );

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues,
    onSubmit,
    validate: validatePositions,
  });

  return (
    <>
      <TableCell align="left">
        <StyledTextField
          variant="outlined"
          autoComplete="off"
          name="article"
          fullWidth
          type="text"
          value={values.article}
          error={errors.article && touched.article}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </TableCell>
      <TableCell align="right">
        <StyledTextField
          variant="outlined"
          autoComplete="off"
          name="price"
          fullWidth
          type="text"
          value={values.price}
          error={errors.price && touched.price}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </TableCell>
      <TableCell align="right">
        <StyledTextField
          variant="outlined"
          autoComplete="off"
          name="link"
          fullWidth
          type="text"
          value={values.link}
          error={errors.link && touched.link}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </TableCell>
      <TableCell align="right">
        <div style={{ minWidth: '90px' }}>
          <Box component="span" mr={1}>
            <Fab
              size="small"
              color="primary"
              aria-label="confirm"
              onClick={handleSubmit}
              disabled={!isValid}
            >
              <DoneIcon />
            </Fab>
          </Box>
          <Fab
            size="small"
            color="secondary"
            aria-label="cancel"
            onClick={cancel}
          >
            <CloseIcon />
          </Fab>
        </div>
      </TableCell>
    </>
  );
};

ProductPositionsForm.propTypes = {
  assortmentItem: PropTypes.object.isRequired,
  cancel: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  PositionsStore: PropTypes.object.isRequired,
  productId: PropTypes.string.isRequired,
};

export default inject('PositionsStore')(
  WithConfirmAction(withSnackbar(observer(ProductPositionsForm))),
);
