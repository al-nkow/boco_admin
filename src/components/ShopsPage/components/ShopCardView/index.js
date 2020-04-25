import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import noImage from '../../../../public/images/no-image.svg';
import { BASE_URL } from '../../../../config/constants';
import { red } from '../../../../config/colors';

const ShopImage = styled.img`
  max-height: 60px;
  max-width: 100%;
  display: block;
  margin: 0 auto 10px auto;
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

const ShopCardView = ({ shop, askDeleteShop, setEdit }) => {
  const {
    _id: shopId,
    image: shopImage,
    name: shopName,
    comments,
    key: shopKey,
  } = shop;
  const shopLogo = shopImage ? `${BASE_URL}${shopImage}` : noImage;

  return (
    <>
      <StyledCardContent>
        <ShopImage src={shopLogo} />
        <div>{shopName}</div>
        <Box mb={1}>{comments}</Box>
        <ImportKey>key: {shopKey}</ImportKey>
      </StyledCardContent>
      <CardActions disableSpacing>
        <Tooltip
          title="Удалить магазин"
          placement="top-end"
          enterDelay={500}
        >
          <IconButton
            aria-label="share"
            onClick={() => askDeleteShop(shopName, shopId)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Редактировать"
          placement="top-end"
          enterDelay={500}
        >
          <IconButton aria-label="share" onClick={setEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </>
  );
};

ShopCardView.propTypes = {
  askDeleteShop: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  shop: PropTypes.object.isRequired,
};

export default ShopCardView;
