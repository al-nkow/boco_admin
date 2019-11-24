import React from 'react';
import * as PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

const ShopsTableRowView = ({
  askDeleteCategory,
  setEditMode,
  category: { _id, name, comments },
}) => {
  return (
    <TableRow>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="right">{comments}</TableCell>
      <TableCell align="right">
        <Tooltip title="Удалить" placement="top-end" enterDelay={500}>
          <IconButton
            aria-label="delete"
            onClick={() => askDeleteCategory(name, _id)}
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
      </TableCell>
    </TableRow>
  );
};

ShopsTableRowView.propTypes = {
  askDeleteCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  setEditMode: PropTypes.func.isRequired,
};

export default ShopsTableRowView;
