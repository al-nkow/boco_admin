import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import CategoriesList from './components/CategoriesList';
import CategoryCreateDialog from './components/CategoryCreateDialog';
import { Wrap } from '../SharedComponents';

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
