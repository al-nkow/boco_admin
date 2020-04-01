import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { Formik } from 'formik';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import CurrentUserForm from '../CurrentUserForm';
import CurrentUserViewData from '../CurrentUserViewData';
import EditButton from '../EditButton';
import validate from '../../services/validateUserData';
import { BASE_URL } from '../../../../config/constants';
import useTooltip from '../../services/useTooltip';

const StyledPaper = styled(Paper)`
  position: relative;
`;

const CurrentUserData = ({
  enqueueSnackbar,
  CurrentUserStore: { updateMe, name, email, avatar },
}) => {
  const initialValues = {
    name: name,
    files: null,
  };
  const [editMode, setEditMode] = useState(false);
  const editData = () => setEditMode(true);
  const cancelEditMode = () => setEditMode(false);
  const showTooltip = useTooltip(enqueueSnackbar);

  /**
   * Update current user name and avatar
   */
  const onSubmit = async values => {
    const { files, name: userName } = values;
    const bodyFormData = new FormData();
    bodyFormData.append('name', userName);

    if (files && files.length)
      bodyFormData.append('userImage', files[0]);

    const state = await updateMe(bodyFormData);

    showTooltip(
      state,
      'Ваши данные успешно обновлены',
      'Ошибка при обновлении информации',
    );
    cancelEditMode();
  };

  return (
    <StyledPaper>
      {editMode ? (
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {props => (
            <CurrentUserForm
              {...props}
              cancelEditMode={cancelEditMode}
            />
          )}
        </Formik>
      ) : (
        <>
          <EditButton editData={editData} />
          <CurrentUserViewData
            userName={name}
            userEmail={email}
            avatar={`${BASE_URL}${avatar}`}
          />
        </>
      )}
    </StyledPaper>
  );
};

CurrentUserData.propTypes = {
  CurrentUserStore: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default inject('CurrentUserStore')(
  withSnackbar(observer(CurrentUserData)),
);
