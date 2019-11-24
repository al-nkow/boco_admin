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
import CategoriesTableRow from './components/CategoriesTableRow';

const CategoriesList = ({ categories }) => {
  return (
    <Paper>
      <Box p={2}>
        <Table aria-label="shops table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell align="right">Комментарии</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(category => (
              <CategoriesTableRow
                key={category._id}
                category={category}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default observer(CategoriesList);
