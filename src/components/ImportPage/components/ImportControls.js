import React from 'react';
import * as PropTypes from 'prop-types';
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
import prepareImportData from '../services/prepareImportData';

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
  wholesaleKeys,
  shopKeys,
  disabled,
}) => {
  const saveImportedData = async () => {
    const preparedData = prepareImportData(
      data,
      wholesaleKeys,
      shopKeys,
    );
    const publishState = await publishData(preparedData);

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
              accept=".xls, .xlsx, .csv"
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
            disabled={disabled}
          >
            Очистить
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            startIcon={<PublishIcon />}
            onClick={saveImportedData}
            disabled={disabled}
          >
            Отправить данные на сервер
          </StyledButton>
        </>
      )}
    </Box>
  );
};

ImportControls.propTypes = {
  clearData: PropTypes.func.isRequired,
  clickDeleteAll: PropTypes.func.isRequired,
  data: PropTypes.array,
  disabled: PropTypes.bool.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  inputEl: PropTypes.object.isRequired,
  publishData: PropTypes.func.isRequired,
  shopKeys: PropTypes.array.isRequired,
  uploadFile: PropTypes.func.isRequired,
  wholesaleKeys: PropTypes.array.isRequired,
};

ImportControls.defaultProps = {
  data: null,
};

export default withSnackbar(ImportControls);
