import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import CategoryCreateDialog from './components/CategoryCreateDialog';
import { Wrap } from '../SharedComponents';
import CategoryCard from './components/CategoryCard';

const CategoriesPage = ({
  CategoriesStore: { getCategories, categories },
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Wrap>
      <CategoryCreateDialog />
      <Grid container spacing={2}>
        {categories.map(category => (
          // eslint-disable-next-line no-underscore-dangle
          <Grid item xs={12} sm={6} md={4} key={category._id}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </Wrap>
  );
};

CategoriesPage.propTypes = {
  CategoriesStore: PropTypes.object.isRequired,
};

export default inject('CategoriesStore')(observer(CategoriesPage));
