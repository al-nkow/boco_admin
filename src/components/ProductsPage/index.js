import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import {
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import ProductNew from './components/ProductNew';
import ProductItem from './components/ProductItem';
import ProductsList from './components/ProductsList';
import { Wrap } from '../SharedComponents';

const ProductRoutes = () => {
  const { productId } = useParams();
  return productId === 'new' ? (
    <ProductNew />
  ) : (
    <ProductItem id={productId} />
  );
};

const ProductsPage = ({
  CategoriesStore: { getCategories, categories },
}) => {
  const { path, url } = useRouteMatch();

  useEffect(() => {
    if (!categories || !categories.length) getCategories();
  }, [categories, getCategories]);

  return (
    <Wrap>
      <Switch>
        <Route exact path={path}>
          <ProductsList url={url} categories={categories} />
        </Route>
        <Route path={`${path}/:productId`}>
          <ProductRoutes categories={categories} />
        </Route>
      </Switch>
    </Wrap>
  );
};

ProductsPage.propTypes = {
  CategoriesStore: PropTypes.object.isRequired,
};

export default inject('CategoriesStore')(observer(ProductsPage));
