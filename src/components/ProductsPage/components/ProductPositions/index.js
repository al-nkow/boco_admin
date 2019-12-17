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

const Index = ({
  ShopsStore: { getShops, shops },
  PositionsStore: { getPositions, positions },
  productId,
}) => {
  useEffect(() => {
    getShops();
    getPositions({
      page: 0,
      limit: 100,
      productId,
    });
  }, [productId, getShops, getPositions]);

  const assortment = [];

  if (shops.length) {
    shops.forEach(shopItem => {
      const shopId = shopItem._id;
      const position = positions.find(
        posItem => posItem.shopId === shopId,
      );
      const shop = {
        shopImage: shopItem.image,
        shopId,
        ...position,
      };
      assortment.push(shop);
    });
  }

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
              {assortment.map(item => (
                <ProductPositionsTableRow
                  productId={productId}
                  key={item.shopId}
                  assortmentItem={item}
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
  PositionsStore: PropTypes.object.isRequired,
  productId: PropTypes.string.isRequired,
  ShopsStore: PropTypes.object.isRequired,
};

export default inject('ShopsStore', 'PositionsStore')(
  observer(Index),
);
