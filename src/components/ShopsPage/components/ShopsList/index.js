import React from 'react';
import * as PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ShopsTableRow from './components/ShopsTableRow';

const ShopsList = ({ shops }) => {
  return (
    <Paper>
      <Box p={2}>
        <Table aria-label="shops table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Логотип</TableCell>
              <TableCell align="left">Название</TableCell>
              <TableCell align="left">Ключ</TableCell>
              <TableCell align="right">Комментарии</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shops.map(shop => (
              <ShopsTableRow key={shop._id} shop={shop} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

ShopsList.propTypes = {
  shops: PropTypes.array.isRequired,
};

export default observer(ShopsList);
