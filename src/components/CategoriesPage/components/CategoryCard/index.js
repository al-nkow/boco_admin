import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withSnackbar } from 'notistack';
import { StyledCard } from '../../../SharedComponents';
import CategoryCardView from '../CategoryCardView';
import CategoryCardEdit from '../CategoryCardEdit';
import WithConfirmAction from '../../../WithConfirmAction';
import { LOAD_STATES } from '../../../../config/constants';

const CategoryCard = ({
  category,
  enqueueSnackbar,
  confirm,
  CategoriesStore: { deleteCategory, editCategory },
}) => {
  const [edit, setEdit] = useState(false);
  const setEditMode = value => setEdit(value);

  const submitEditCategory = async values => {
    const { files, name, comments, image } = values;
    const bodyFormData = new FormData();

    bodyFormData.append('name', name);
    bodyFormData.append('comments', comments);
    bodyFormData.append('image', image);

    if (files && files.length)
      bodyFormData.append('categoryImage', files[0]);

    const { _id: id } = category;
    const state = await editCategory(id, bodyFormData);

    if (state === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при редактировании категории', {
        variant: 'error',
      });
    } else if (state === LOAD_STATES.DONE) {
      enqueueSnackbar('Категория успешно отредактирована', {
        variant: 'success',
      });
      setEdit(false);
    }
  };

  const performDeleteCategory = async id => {
    const deleteState = await deleteCategory(id);

    if (deleteState === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при попытке удалить категорию', {
        variant: 'error',
      });
    } else if (deleteState === LOAD_STATES.DONE) {
      enqueueSnackbar('Категория успешно удалена', {
        variant: 'success',
      });
    }
  };

  const askDeleteCategory = (name, id) => {
    confirm({
      message: `Вы уверены что хотите удалить категорию ${name}? 
      Это действие невозможно будет отменить.`,
    })
      .then(performDeleteCategory.bind(null, id))
      .catch(() => {});
  };

  return (
    <StyledCard>
      {!edit ? (
        <CategoryCardView
          setEditMode={setEditMode}
          category={category}
          askDeleteCategory={askDeleteCategory}
        />
      ) : (
        <CategoryCardEdit
          setEditMode={setEditMode}
          onSubmit={submitEditCategory}
          category={category}
        />
      )}
    </StyledCard>
  );
};

CategoryCard.propTypes = {
  CategoriesStore: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  confirm: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default inject('CategoriesStore')(
  WithConfirmAction(withSnackbar(CategoryCard)),
);
