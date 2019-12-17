import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import ProductPositionsForm from './ProductPositionsForm';
import { BASE_URL } from '../../../../../config/constants';

const StyledImage = styled.img`
  max-width: 120px;
  width: 100%;
  border-radius: 4px;
  display: block;
`;

const ProductPositionsTableRow = ({ assortmentItem, productId }) => {
  const [editMode, setEditMode] = useState(false);
  const cancel = () => setEditMode(false);

  return (
    <TableRow>
      <TableCell>
        <StyledImage
          src={`${BASE_URL}${assortmentItem.shopImage}`}
          alt=""
        />
      </TableCell>
      {!editMode && (
        <>
          {assortmentItem.productId ? (
            <>
              <TableCell align="left">
                {assortmentItem.article}
              </TableCell>
              <TableCell align="right">
                {assortmentItem.price}
              </TableCell>
              <TableCell align="right">
                {assortmentItem.link}
              </TableCell>
            </>
          ) : (
            <TableCell colSpan={3} align="left">
              товара нет в наличии
            </TableCell>
          )}
          <TableCell align="right">
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => setEditMode(true)}
              fullWidth
            >
              Добавить
            </Button>
          </TableCell>
        </>
      )}
      {editMode && (
        <ProductPositionsForm
          cancel={cancel}
          shopId={assortmentItem.shopId}
          productId={productId}
        />
      )}
    </TableRow>
  );
};

export default ProductPositionsTableRow;
