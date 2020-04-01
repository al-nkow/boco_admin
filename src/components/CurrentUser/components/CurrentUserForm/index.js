import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DropZone from '../../../Dropzone';

const FileInpLabel = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
  margin-bottom: 5px;
`;

const CurrentUserForm = ({
  cancelEditMode,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
  isValid,
}) => {
  const filesAdded = value => setFieldValue('files', value);

  return (
    <Box p={2}>
      <Box mb={2}>
        <FileInpLabel>Изменить аватар</FileInpLabel>
        <DropZone
          onChange={filesAdded}
          maxFileSize={2}
          accept="image/x-png,image/jpeg"
        />
      </Box>
      <Box mb={2}>
        <TextField
          autoComplete="off"
          name="name"
          value={values.name}
          label="Редактировать имя"
          fullWidth
          helperText={errors.name && touched.name ? errors.name : ''}
          error={errors.name && touched.name}
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Box>
      <Grid direction="row" container justify="flex-end">
        <Box mr={1}>
          <Button
            size="small"
            color="primary"
            onClick={cancelEditMode}
          >
            Отмена
          </Button>
        </Box>
        <Button
          size="small"
          color="primary"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Сохранить изменения
        </Button>
      </Grid>
    </Box>
  );
};

CurrentUserForm.propTypes = {
  cancelEditMode: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default CurrentUserForm;
