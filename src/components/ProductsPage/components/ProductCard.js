import React from 'react';
import * as PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import FolderIcon from '@material-ui/icons/Folder';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import noimage from '../../../public/images/noimage.png';

const Image = styled.img`
  width: 100%;
  display: block;
`;

const Title = styled.div`
  font-size: 20px;
`;

const SubTitle = styled.div`
  font-size: 14px;
`;

const StyledFolderIcon = styled(FolderIcon)`
  &.MuiSvgIcon-root {
    font-size: 17px;
    vertical-align: middle;
    margin-top: -4px;
    margin-right: 5px;
  }
`;

const StyledLocationCityIcon = styled(LocationCityIcon)`
  &.MuiSvgIcon-root {
    font-size: 17px;
    vertical-align: middle;
    margin-top: -4px;
    margin-right: 5px;
  }
`;

const StyledPaper = styled(Paper)`
  position: relative;
  padding-right: 56px;
`;

const Controls = styled.div`
  width: 46px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ProductCard = ({ product, deleteProduct, editProduct }) => {
  const clickDeleteProduct = event => {
    event.preventDefault();
    deleteProduct(product);
  };

  const clickEditProduct = event => {
    event.preventDefault();
    editProduct(product);
  };

  return (
    <StyledPaper>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Image src={product.image || noimage} alt="" />
          </Grid>
          <Grid item xs={9}>
            <Title>{product.name}</Title>
            {product.category && (
              <SubTitle>
                <StyledFolderIcon color="primary" />
                {product.categoryName}
              </SubTitle>
            )}
            {product.brand && (
              <Box mb={2}>
                <StyledLocationCityIcon color="primary" />
                {product.brand}
              </Box>
            )}
            {product.description && <p>{product.description}</p>}
            <Grid container spacing={2}>
              {product.height && (
                <Grid item>Высота: {product.height}мм</Grid>
              )}
              {product.width && (
                <Grid item>Ширина: {product.width}мм</Grid>
              )}
              {product.thickness && (
                <Grid item>Толщина: {product.thickness}мм</Grid>
              )}
              {product.area && (
                <Grid item>Площадь: {product.area}м.кв</Grid>
              )}
              {product.volumeL && (
                <Grid item>Объем: {product.volumeL}л</Grid>
              )}
              {product.volumeM && (
                <Grid item>Объем: {product.volumeM}м.кв</Grid>
              )}
              {product.weight && (
                <Grid item>Вес: {product.weight}кг</Grid>
              )}
              {product.bocoArticle && (
                <Grid item>Артикул: <b>{product.bocoArticle}</b></Grid>
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
  product: PropTypes.object.isRequired,
};

export default ProductCard;
