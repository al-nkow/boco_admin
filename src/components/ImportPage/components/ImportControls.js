import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ClearIcon from '@material-ui/icons/Clear';
import WarningIcon from '@material-ui/icons/Warning';
import PublishIcon from '@material-ui/icons/Publish';
import { withSnackbar } from 'notistack';
import { LOAD_STATES } from '../../../config/constants';
import history from '../../../history';

const ImportControls = ({
  data,
  inputEl,
  uploadFile,
  clickDeleteAll,
  clearData,
  publishData,
  enqueueSnackbar,
}) => {

  // какого хера 2 раза ???????
  console.log('RENDER IMPORTCONTROLS >>>>>>', data ? data.toJSON() : null);

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
      // clearData();
      // переход на страницу товаров
      history.push(`/products`);
    }
  };

  return (
    <Box mb={2}>
      {!data ? (
        <>
          <Button
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
          </Button>
          <Box component="span" ml={2}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<WarningIcon />}
              onClick={clickDeleteAll}
            >
              Удалить все товары
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ClearIcon />}
            onClick={clearData}
          >
            Очистить
          </Button>
          <Box component="span" ml={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PublishIcon />}
              onClick={saveImportedData}
            >
              Отправить данные на сервер
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default withSnackbar(ImportControls);
