import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ProductPositionsTableRow from './components/ProductPositionsTableRow';

const Index = ({ ShopsStore: { getShops, shops } }) => {
  useEffect(() => {
    getShops();
  }, [getShops]);

  return (
    <Box mt={2}>
      <Paper>
        <Box p={2}>
          <Table aria-label="shops table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Магазин</TableCell>
                <TableCell align="left">Артикул</TableCell>
                <TableCell align="right">Цена (руб)</TableCell>
                <TableCell align="right">Ссылка на товар</TableCell>
                <TableCell align="right">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shops.map(shop => (
                <ProductPositionsTableRow
                  key={shop._id}
                  shop={shop}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
};

Index.propTypes = {
  ShopsStore: PropTypes.object.isRequired,
};

export default inject('ShopsStore')(observer(Index));
