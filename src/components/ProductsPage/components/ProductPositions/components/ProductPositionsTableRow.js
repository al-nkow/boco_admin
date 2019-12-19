import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import styled from 'styled-components';
import TableRow from '@material-ui/core/TableRow';
import ProductPositionsForm from './ProductPositionsForm';
import { BASE_URL } from '../../../../../config/constants';
import ProductPositionsTableRowView from './ProductPositionsTableRowView';

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
        <ProductPositionsTableRowView
          assortmentItem={assortmentItem}
          setEditMode={setEditMode}
        />
      )}
      {editMode && (
        <ProductPositionsForm
          cancel={cancel}
          assortmentItem={assortmentItem}
          productId={productId}
        />
      )}
    </TableRow>
  );
};

ProductPositionsTableRow.propTypes = {
  assortmentItem: PropTypes.object.isRequired,
  productId: PropTypes.string.isRequired,
};

export default ProductPositionsTableRow;
