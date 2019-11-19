import React from 'react';
import { inject, observer } from 'mobx-react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';
import { withSnackbar } from 'notistack';
import WithConfirmAction from '../WithConfirmAction';
import { LOAD_STATES } from '../../config/constants';

const baseUrl = 'http://localhost:5000';

const StyledImage = styled.img`
  width: 100px;
  border-radius: 4px;
`;

const ShopsList = ({
  shops,
  confirm,
  enqueueSnackbar,
  ShopsStore: { deleteShop, deleteShopState },
}) => {
  const performDeleteShop = async id => {
    const state = await deleteShop(id);
    if (state === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при попытке удалить магазин', {
        variant: 'error',
      });
    } else if (state === LOAD_STATES.DONE) {
      enqueueSnackbar('Магазин успешно удален', {
        variant: 'success',
      });
    }
  };

  const askDeleteShop = (name, id) => {
    confirm({
      message: `Вы уверены что хотите удалить магазин ${name}? 
      Это действие невозможно будет отменить.`,
    })
      .then(performDeleteShop.bind(null, id))
      .catch(() => {});
  };

  return (
    <Paper>
      <Box p={2}>
        <Table aria-label="shops table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Логотип</TableCell>
              <TableCell align="right">Название</TableCell>
              <TableCell align="right">Комментарии</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shops.map(shop => (
              <TableRow key={shop._id}>
                <TableCell component="th" scope="row">
                  <StyledImage src={`${baseUrl}${shop.image}`} alt=""/>
                </TableCell>
                <TableCell align="right">{shop.name}</TableCell>
                <TableCell align="right">{shop.comments}</TableCell>
                <TableCell align="right">
                  <Tooltip
                    title="Удалить"
                    placement="top-end"
                    enterDelay={500}
                  >
                    <IconButton
                      aria-label="delete"
                      onClick={() =>
                        askDeleteShop(shop.name, shop._id)
                      }
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Редактировать"
                    placement="top-end"
                    enterDelay={500}
                  >
                    <IconButton aria-label="edit" onClick={() => {}}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default inject('ShopsStore')(
  WithConfirmAction(withSnackbar(observer(ShopsList))),
);
