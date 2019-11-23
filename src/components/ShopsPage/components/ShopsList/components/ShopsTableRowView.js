import React from 'react';
import * as PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';
import { BASE_URL } from '../../../../../config/constants';

const StyledImage = styled.img`
  width: 100px;
  border-radius: 4px;
  display: block;
`;

const ShopsTableRowView = ({
  askDeleteShop,
  setEditMode,
  shop: { _id, image, name, comments },
}) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <StyledImage src={`${BASE_URL}${image}`} alt="" />
      </TableCell>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="right">{comments}</TableCell>
      <TableCell align="right">
        <Tooltip title="Удалить" placement="top-end" enterDelay={500}>
          <IconButton
            aria-label="delete"
            onClick={() => askDeleteShop(name, _id)}
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
  askDeleteShop: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
  shop: PropTypes.object.isRequired,
};

export default ShopsTableRowView;
