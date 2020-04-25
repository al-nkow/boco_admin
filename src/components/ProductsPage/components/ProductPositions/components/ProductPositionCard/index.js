import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { inject } from 'mobx-react';
import Card from '@material-ui/core/Card';
import ProductPositionCardView from '../ProductPositionCardView';
import ProductPositionCardForm from '../ProductPositionCardForm';
import usePositionDelete from '../../services/usePositionDelete';
import WithConfirmAction from '../../../../../WithConfirmAction';

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
    <Card>
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
    </Card>
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
