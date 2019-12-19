import React from 'react';
import * as PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withSnackbar } from 'notistack';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import WithConfirmAction from '../../../../WithConfirmAction';
import usePositionDelete from '../services/usePositionDelete';

const ProductPositionsTableRowView = ({
  setEditMode,
  confirm,
  enqueueSnackbar,
  assortmentItem: { _id, productId, article, price, link },
  PositionsStore: { deletePosition },
}) => {
  const { confirmDeletePosition } = usePositionDelete(
    enqueueSnackbar,
    confirm,
    deletePosition,
    _id,
    article,
  );

  return (
    <>
      {productId ? (
        <>
          <TableCell align="left">{article}</TableCell>
          <TableCell align="right">{price}</TableCell>
          <TableCell align="right">{link}</TableCell>
        </>
      ) : (
        <TableCell colSpan={3} align="left">
          товара нет в наличии
        </TableCell>
      )}
      <TableCell align="right">
        {!_id ? (
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => setEditMode(true)}
            fullWidth
          >
            Добавить
          </Button>
        ) : (
          <div style={{ minWidth: '90px' }}>
            <Tooltip
              title="Удалить"
              placement="top-end"
              enterDelay={500}
            >
              <IconButton
                aria-label="delete"
                onClick={confirmDeletePosition}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Редактировать"
              placement="top-end"
              enterDelay={500}
            >
              <IconButton
                aria-label="edit"
                onClick={() => setEditMode(true)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </TableCell>
    </>
  );
};

ProductPositionsTableRowView.propTypes = {
  assortmentItem: PropTypes.object.isRequired,
  confirm: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  PositionsStore: PropTypes.object.isRequired,
  setEditMode: PropTypes.func.isRequired,
};

export default inject('PositionsStore')(
  WithConfirmAction(withSnackbar(ProductPositionsTableRowView)),
);
