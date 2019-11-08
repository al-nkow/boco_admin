import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const UsersTable = ({ users, deleteUser, editUser }) => {
  const userId = localStorage.getItem('id');
  return (
    <Table aria-label="users table" size="small">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Email</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(user => (
          <TableRow key={user._id}>
            <TableCell component="th" scope="row">
              {user._id}
            </TableCell>
            <TableCell align="right">{user.name}</TableCell>
            <TableCell align="right">{user.email}</TableCell>
            <TableCell align="right" style={{ paddingRight: 0 }}>
              {userId !== user._id && (
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteUser(user.email, user._id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
              <IconButton
                aria-label="edit"
                onClick={() => editUser(user)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

UsersTable.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

export default observer(UsersTable);
