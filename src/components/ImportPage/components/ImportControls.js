import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ClearIcon from '@material-ui/icons/Clear';
import WarningIcon from '@material-ui/icons/Warning';

const ImportControls = ({
  data,
  inputEl,
  uploadFile,
  clickDeleteAll,
  clearData,
}) => {
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
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ClearIcon />}
          onClick={clearData}
        >
          Очистить
        </Button>
      )}
    </Box>
  );
};

export default ImportControls;
