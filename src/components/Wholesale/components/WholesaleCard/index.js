import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import WholesaleCardView from '../WholesaleCardView';
import WholesaleCardEdit from '../WholesaleCardEdit';
import WithConfirmAction from '../../../WithConfirmAction';
import { StyledCard } from '../../../SharedComponents';

const WholesaleCard = ({
  item,
  confirm,
  WholesaleStore: { deleteWholesale },
}) => {
  const [edit, setEdit] = useState(false);
  const editCard = () => setEdit(true);
  const cancel = () => setEdit(false);

  const performDeleteWholesaleItem = async id => {
    await deleteWholesale(id);
  };

  const askDeleteItem = (name, id) => {
    confirm({
      message: `Вы уверены что хотите удалить оптовый параметр "${name}"? 
      Это действие невозможно будет отменить.`,
    })
      .then(performDeleteWholesaleItem.bind(null, id))
      .catch(() => {});
  };

  return (
    <StyledCard>
      {!edit ? (
        <WholesaleCardView
          item={item}
          askDeleteItem={askDeleteItem}
          editCard={editCard}
        />
      ) : (
        <WholesaleCardEdit item={item} cancel={cancel} />
      )}
    </StyledCard>
  );
};

WholesaleCard.propTypes = {
  confirm: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  WholesaleStore: PropTypes.object.isRequired,
};

export default inject('WholesaleStore')(
  WithConfirmAction(observer(WholesaleCard)),
);
