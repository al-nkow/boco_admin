import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { BASE_URL } from '../../../config/constants';
import history from '../../../history';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const StyledImage = styled.img`
  width: 100%;
  border-radius: 4px;
  display: block;
`;

const Price = styled.span`
  font-size: 16px;
`;

const Name = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const PositionCard = ({ position }) => {
  const defaultImage =
    'https://i.pinimg.com/originals/2c/a6/20/2ca62076d91319fd3fb1062bdb20ab13.jpg';

  const goToProduct = () => {
    history.push(`/products/${position.product._id}`);
  };

  return (
    <Card>
      <CardActionArea onClick={goToProduct}>
        <CardMedia
          style={{ height: '140px' }}
          image={position.product.link || defaultImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Name>
            { position.product.name }
          </Name>
          <Grid
            container
            spacing={3}
          >
            <Grid item xs={6}>
              <StyledImage src={`${BASE_URL}${position.shop.image}`} alt="" />
            </Grid>
            <Grid
              item
              xs={6}
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
            >
              <Price>{ position.price } &#8381;</Price>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PositionCard;
