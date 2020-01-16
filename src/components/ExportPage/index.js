import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ClearIcon from '@material-ui/icons/Clear';
import { Wrap } from '../SharedComponents';
import useParseXls from './services/useParseXls';
import ExportTable from './components/ExportTable';
import Loader from '../Loader';

const ExportPage = () => {
  const inputEl = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const parseXls = useParseXls();

  const uploadFile = async () => {
    const selectedFile = inputEl.current.files[0];
    if (selectedFile) {
      setLoading(true);
      parseXls(selectedFile, setData, setLoading);
    }
  };

  const clearFileInput = () => {
    setData(null);
  };

  return (
    <Wrap>
      <Box mb={2}>
        {!data ? (
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
        ) : (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ClearIcon />}
            onClick={clearFileInput}
          >
            Очистить
          </Button>
        )}
      </Box>
      {loading && <Loader disableShrink />}
      {data && <ExportTable data={data} />}
    </Wrap>
  );
};

export default ExportPage;
