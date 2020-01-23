import React, { useRef, useState } from 'react';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withSnackbar } from 'notistack';
import { Wrap } from '../SharedComponents';
import useParseXls from './services/useParseXls';
import ImportTable from './components/ImportTable';
import Loader from '../Loader';
import ImportControls from './components/ImportControls';
import WithConfirmAction from '../WithConfirmAction';
import { LOAD_STATES } from '../../config/constants';

const ImportPage = ({
  confirm,
  enqueueSnackbar,
  ImportStore: {
    deleteAllProducts,
    setImportedData,
    importedData,
    publishData,
  },
}) => {
  const inputEl = useRef(null);
  const [loading, setLoading] = useState(false);
  const parseXls = useParseXls(importedData);

  const uploadFile = async () => {
    const selectedFile = inputEl.current.files[0];
    if (selectedFile) {
      setLoading(true);
      parseXls(selectedFile, setImportedData, setLoading);
    }
  };

  const clearData = () => {
    setImportedData(null);
  };

  const performDeleteAll = async () => {
    const deleteState = await deleteAllProducts();

    if (deleteState === LOAD_STATES.ERROR) {
      enqueueSnackbar('Ошибка при попытке удалить товары и позиции', {
        variant: 'error',
      });
    } else if (deleteState === LOAD_STATES.DONE) {
      enqueueSnackbar('Все товары и позиции успешно удалены', {
        variant: 'success',
      });
    }
  };

  const clickDeleteAll = () => {
    confirm({
      message: `Вы действительно хотите удалить все товары и связанные с ними позиции в ассортименте магазинов? 
      Это действие невозможно будет отменить!`,
    }).then(() => performDeleteAll());
  };

  return (
    <Wrap>
      <ImportControls
        data={importedData}
        inputEl={inputEl}
        uploadFile={uploadFile}
        clickDeleteAll={clickDeleteAll}
        clearData={clearData}
        publishData={publishData}
      />
      {loading && <Loader disableShrink />}
      <ImportTable />
    </Wrap>
  );
};

ImportPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  ImportStore: PropTypes.object.isRequired,
};

export default inject('ImportStore')(
  WithConfirmAction(withSnackbar(observer(ImportPage))),
);
