import React from 'react';
import styled from 'styled-components';
import CreateCategory from '../CreateCategory';
import CategoriesList from '../CategoriesList';

const Wrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const CategoriesPage = () => {
  return (
    <Wrap>
      <CreateCategory />
      <CategoriesList />
    </Wrap>
  );
};

export default CategoriesPage;