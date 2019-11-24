import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withSnackbar } from 'notistack';
import CategoriesTableRowView from './CategoriesTableRowView';
import CategoriesTableRowEdit from './CategoriesTableRowEdit';
import WithConfirmAction from '../../../../WithConfirmAction';
import { LOAD_STATES } from '../../../../../config/constants';

const CategoriesTableRow = ({
  category,
  confirm,
  enqueueSnackbar,
  CategoriesStore: { deleteCategory, editCategory },
}) => {
  const [edit, setEdit] = useState(false);
  const setEditMode = value => setEdit(value);

  const submitEditCategory = async values => {
    const state = await editCategory(category._id, values);

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

  return edit ? (
    <CategoriesTableRowEdit
      setEditMode={setEditMode}
      onSubmit={submitEditCategory}
      category={category}
    />
  ) : (
    <CategoriesTableRowView
      setEditMode={setEditMode}
      category={category}
      askDeleteCategory={askDeleteCategory}
    />
  );
};

CategoriesTableRow.propTypes = {
  CategoriesStore: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  confirm: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default inject('CategoriesStore')(
  WithConfirmAction(withSnackbar(CategoriesTableRow)),
);
