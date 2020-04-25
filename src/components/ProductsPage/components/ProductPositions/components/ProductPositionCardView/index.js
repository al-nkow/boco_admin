import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import noImage from '../../../../../../public/images/no-image.svg';
import { BASE_URL } from '../../../../../../config/constants';

const ShopImg = styled.img`
  max-width: 100%;
  max-height: 42px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  margin-left: auto;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

const ProductPositionCardView = ({
  shop: { shopImage, price, article, link, productId },
  edit,
  deletePosition,
}) => {
  const shopLogo = shopImage ? `${BASE_URL}${shopImage}` : noImage;

  return (
    <>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <ShopImg src={shopLogo} alt="" />
          </Grid>
          <Grid
            item
            container
            xs={6}
            alignItems="center"
            justify="flex-end"
          >
            {price ? <Price>{price} ₽</Price> : ''}
          </Grid>
        </Grid>
        {productId ? (
          <div>Артикул: {article}</div>
        ) : (
          'Товара нет в наличии'
        )}
      </CardContent>
      <CardActions disableSpacing>
        {productId ? (
          <>
            <Tooltip
              title="Удалить"
              placement="top-end"
              enterDelay={500}
            >
              <IconButton aria-label="share" onClick={deletePosition}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Редактировать"
              placement="top-end"
              enterDelay={500}
            >
              <IconButton aria-label="share" onClick={edit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <StyledLink
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="small"
                variant="contained"
                color="primary"
              >
                В магазин
              </Button>
            </StyledLink>
          </>
        ) : (
          <Button
            fullWidth
            size="small"
            variant="contained"
            color="primary"
            onClick={edit}
          >
            Добавить
          </Button>
        )}
      </CardActions>
    </>
  );
};

ProductPositionCardView.propTypes = {
  deletePosition: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  shop: PropTypes.object.isRequired,
};

export default ProductPositionCardView;
