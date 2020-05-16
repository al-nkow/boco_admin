import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import { red } from '../../../../config/colors';

const Name = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const ImportKey = styled.span`
  color: #ffffff;
  background: ${red};
  padding: 2px 6px;
  font-size: 14px;
  border-radius: 2px;
`;

const StyledCardContent = styled(CardContent)`
  padding-bottom: 0 !important;
`;

const WholesaleCardView = ({
  item: { name, comments, key, _id: id },
  askDeleteItem,
  editCard,
}) => {
  return (
    <>
      <StyledCardContent>
        <Box mb={2}>
          <Name>{name}</Name>
          {comments}
        </Box>
        <ImportKey>key: {key}</ImportKey>
      </StyledCardContent>
      <CardActions disableSpacing>
        <Tooltip
          title="Удалить магазин"
          placement="top-end"
          enterDelay={500}
        >
          <IconButton
            aria-label="share"
            onClick={() => askDeleteItem(name, id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Редактировать"
          placement="top-end"
          enterDelay={500}
        >
          <IconButton aria-label="share" onClick={editCard}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </>
  );
};

WholesaleCardView.propTypes = {
  askDeleteItem: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default WholesaleCardView;
