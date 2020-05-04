import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { inject } from 'mobx-react';
import ProductPositionCardView from '../ProductPositionCardView';
import ProductPositionCardForm from '../ProductPositionCardForm';
import usePositionDelete from '../../services/usePositionDelete';
import WithConfirmAction from '../../../../../WithConfirmAction';
import { StyledCard } from '../../../../../SharedComponents';

const ProductPositionCard = ({
  enqueueSnackbar,
  confirm,
  shop,
  productId,
  PositionsStore: { deletePosition },
}) => {
  const [editMode, setEditMode] = useState(false);
  const cancel = () => setEditMode(false);
  const edit = () => setEditMode(true);
  const { _id, article } = shop;

  const { confirmDeletePosition } = usePositionDelete(
    enqueueSnackbar,
    confirm,
    deletePosition,
    _id,
    article,
  );

  return (
    <StyledCard>
      {editMode ? (
        <ProductPositionCardForm
          shop={shop}
          productId={productId}
          cancel={cancel}
        />
      ) : (
        <ProductPositionCardView
          shop={shop}
          edit={edit}
          cancel={cancel}
          deletePosition={confirmDeletePosition}
        />
      )}
    </StyledCard>
  );
};

ProductPositionCard.propTypes = {
  confirm: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  PositionsStore: PropTypes.object.isRequired,
  productId: PropTypes.string.isRequired,
  shop: PropTypes.object.isRequired,
};

export default inject('PositionsStore')(
  WithConfirmAction(withSnackbar(ProductPositionCard)),
);
