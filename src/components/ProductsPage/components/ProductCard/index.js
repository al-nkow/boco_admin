import React from 'react';
import * as PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import noImage from '../../../../public/images/no-image.svg';
import {
  Image,
  Title,
  SubTitle,
  StyledFolderIcon,
  StyledLocationCityIcon,
  StyledPaper,
  Controls,
} from './parts';

const ProductCard = ({ product, deleteProduct, editProduct }) => {
  const clickDeleteProduct = event => {
    event.preventDefault();
    deleteProduct(product);
  };

  const clickEditProduct = event => {
    event.preventDefault();
    editProduct(product);
  };

  const {
    image,
    name,
    category,
    categoryName,
    brand,
    description,
    height,
    width,
    thickness,
    area,
    volumeL,
    volumeM,
    weight,
    bocoArticle,
  } = product;

  return (
    <StyledPaper>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Image src={image || noImage} alt="" />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box mb={1}>
              <Title>{name}</Title>
            </Box>
            {category && (
              <SubTitle>
                <StyledFolderIcon color="primary" />
                {categoryName}
              </SubTitle>
            )}
            {brand && (
              <Box mb={2}>
                <StyledLocationCityIcon color="primary" />
                {brand}
              </Box>
            )}
            {description && <p>{description}</p>}
            <Grid container spacing={2}>
              {height && <Grid item>Высота: {height}мм</Grid>}
              {width && <Grid item>Ширина: {width}мм</Grid>}
              {thickness && <Grid item>Толщина: {thickness}мм</Grid>}
              {area && <Grid item>Площадь: {area}м.кв</Grid>}
              {volumeL && <Grid item>Объем: {volumeL}л</Grid>}
              {volumeM && <Grid item>Объем: {volumeM}м.кв</Grid>}
              {weight && <Grid item>Вес: {weight}кг</Grid>}
              {bocoArticle && (
                <Grid item>
                  Артикул: <b>{bocoArticle}</b>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Controls>
        <Tooltip title="Удалить" placement="top-end" enterDelay={500}>
          <IconButton
            aria-label="delete"
            onClick={clickDeleteProduct}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {editProduct && (
          <Tooltip
            title="Редактировать"
            placement="top-end"
            enterDelay={500}
          >
            <IconButton aria-label="edit" onClick={clickEditProduct}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Controls>
    </StyledPaper>
  );
};

ProductCard.propTypes = {
  deleteProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

export default ProductCard;
