import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';
import ProductNew from './components/ProductNew';
import ProductItem from './components/ProductItem';
import ProductsList from './components/ProductsList';

const Wrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const ProductRoutes = () => {
  const { productId } = useParams();
  return productId === 'new' ? <ProductNew /> : <ProductItem id={productId} />;
};

const SomeName = ({
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

export default inject('CategoriesStore')(observer(SomeName));