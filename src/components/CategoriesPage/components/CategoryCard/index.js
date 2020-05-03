import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withSnackbar } from 'notistack';
import Card from '@material-ui/core/Card';
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
    const { _id: id } = category;
    const state = await editCategory(id, values);

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
    <Card>
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
    </Card>
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
