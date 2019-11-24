import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import CategoriesList from './components/CategoriesList';
import CategoryCreateDialog from './components/CategoryCreateDialog';

const Wrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const CategoriesPage = ({
  CategoriesStore: { getCategories, categories },
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Wrap>
      <CategoryCreateDialog />
      <CategoriesList categories={categories} />
    </Wrap>
  );
};

CategoriesPage.propTypes = {
  CategoriesStore: PropTypes.object.isRequired,
};

export default inject('CategoriesStore')(observer(CategoriesPage));
