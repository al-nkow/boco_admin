import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import ProductCard from './ProductCard';

// products/5de2ef78893ff5712eab9ff3

const ProductItem = ({
  CategoriesStore: { getCategoryItem, currentCategory },
  ProductsStore: { getProductItem, currentProduct },
  id,
}) => {
  useEffect(() => {
    (async function getProductAndCategoryName() {
      const product = await getProductItem(id);
      if (product) getCategoryItem(product.category);
    })();
  }, [id, getProductItem, getCategoryItem]);

  const product = {
    ...currentProduct,
    categoryName: currentCategory ? currentCategory.name : '',
  };

  return (
    <>
      {currentProduct ? (
        <ProductCard product={product} />
      ) : (
        <div>Такого товара не существует</div>
      )}
    </>
  );
};

export default inject('CategoriesStore', 'ProductsStore')(
  observer(ProductItem),
);
