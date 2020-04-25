import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

const Param = styled.div`
  font-size: 14px;
  margin-bottom: 2px;
`;

const ProductParams = ({ product }) => {
  const {
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
    <>
      {height && <Param>Высота: {height}мм</Param>}
      {width && <Param>Ширина: {width}мм</Param>}
      {thickness && <Param>Толщина: {thickness}мм</Param>}
      {area && <Param>Площадь: {area}м.кв</Param>}
      {volumeL && <Param>Объем: {volumeL}л</Param>}
      {volumeM && <Param>Объем: {volumeM}м.кв</Param>}
      {weight && <Param>Вес: {weight}кг</Param>}
      {bocoArticle && <Param>Артикул: {bocoArticle}</Param>}
    </>
  );
};

ProductParams.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductParams;
