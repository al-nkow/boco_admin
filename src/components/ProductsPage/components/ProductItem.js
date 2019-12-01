import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import ProductCard from './ProductCard';

// products/5de2ef78893ff5712eab9ff3

const ProductItem = ({
  CategoriesStore: { getCategories, categories },
  ProductsStore: { getProductItem, currentProduct },
  id,
}) => {
  useEffect(() => {
    if (!categories || !categories.length) getCategories();
    getProductItem(id);
  }, [id, categories, getCategories, getProductItem]);

  return (
    <>
      {currentProduct ? (
        <ProductCard
          product={currentProduct}
          categories={categories}
        />
      ) : (
        <div>huy</div>
      )}
    </>
  );
};

export default inject('CategoriesStore', 'ProductsStore')(
  observer(ProductItem),
);