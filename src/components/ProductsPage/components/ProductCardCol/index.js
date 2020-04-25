import React from 'react';
import * as PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import history from '../../../../history';
import noImage from '../../../../public/images/no-image.svg';
import ProductParams from '../ProductParams';

const Name = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const ProductCardCol = ({ product, deleteProduct }) => {
  const { image, name, _id, categoryName, brand } = product;
  const goToProduct = () => {
    history.push(`/products/${_id}`);
  };

  return (
    <Card>
      <CardActionArea onClick={goToProduct}>
        <CardMedia
          style={{ minHeight: '200px' }}
          image={image || noImage}
          title={name}
        />
        <CardContent>
          <Name>{name}</Name>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {categoryName}
          </Typography>
          <Box pt={1}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {brand}
            </Typography>
          </Box>
          <Box pt={1}>
            <ProductParams product={product} />
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton
          aria-label="share"
          onClick={() => deleteProduct(product)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

ProductCardCol.propTypes = {
  deleteProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

export default ProductCardCol;
