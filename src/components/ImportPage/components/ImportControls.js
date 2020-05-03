import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ClearIcon from '@material-ui/icons/Clear';
import WarningIcon from '@material-ui/icons/Warning';
import PublishIcon from '@material-ui/icons/Publish';
import { withSnackbar } from 'notistack';
import { LOAD_STATES } from '../../../config/constants';
import history from '../../../history';

const StyledButton = styled(Button)`
  &.MuiButtonBase-root {
    margin-right: 10px;
    margin-bottom: 10px;
    @media (max-width: 410px) {
      margin-right: 0;
      width: 100%;
    }
  }
`;

const ImportControls = ({
  data,
  inputEl,
  uploadFile,
  clickDeleteAll,
  clearData,
  publishData,
  enqueueSnackbar,
}) => {
  const saveImportedData = async () => {
    const publishState = await publishData();
    if (publishState === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при отправке данных на сервер', {
        variant: 'error',
      });
    } else if (publishState === LOAD_STATES.DONE) {
      enqueueSnackbar('Все данные успешно сохранены!', {
        variant: 'success',
      });
      clearData();
      history.push(`/products`);
    }
  };

  return (
    <Box mb={2}>
      {!data ? (
        <>
          <StyledButton
            variant="contained"
            component="label"
            color="primary"
            startIcon={<CloudUploadIcon />}
          >
            Загрузить данные из XLS таблицы
            <input
              style={{ display: 'none' }}
              ref={inputEl}
              type="file"
              accept=".xls, .xlsx"
              onChange={uploadFile}
            />
          </StyledButton>
          <StyledButton
            variant="contained"
            color="secondary"
            startIcon={<WarningIcon />}
            onClick={clickDeleteAll}
          >
            Удалить все товары
          </StyledButton>
        </>
      ) : (
        <>
          <StyledButton
            variant="contained"
            color="secondary"
            startIcon={<ClearIcon />}
            onClick={clearData}
          >
            Очистить
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            startIcon={<PublishIcon />}
            onClick={saveImportedData}
          >
            Отправить данные на сервер
          </StyledButton>
        </>
      )}
    </Box>
  );
};

export default withSnackbar(ImportControls);
