import React, { useRef, useState, useEffect } from 'react';
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
  ShopsStore: { getShops, shops },
  WholesaleStore: { getWholesale, list: wholesaleList },
  ImportStore: {
    deleteAllProducts,
    setImportedData,
    importedData,
    publishData,
    publishState,
  },
}) => {
  const inputEl = useRef(null);
  const [loading, setLoading] = useState(false);
  const wholesaleKeys = wholesaleList.map(item => item.key);
  const shopKeys = shops.map(item => item.key);

  const { parseXls } = useParseXls(
    setImportedData,
    setLoading,
    wholesaleKeys,
    shopKeys,
  );

  const uploadFile = async () => {
    const selectedFile = inputEl.current.files[0];
    if (selectedFile) {
      setLoading(true);
      parseXls(selectedFile);
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

  useEffect(() => {
    if (!wholesaleList || !wholesaleList.length) getWholesale();
  }, [wholesaleList, getWholesale]);

  useEffect(() => {
    if (!shops || !shops.length) getShops();
  }, [shops, getShops]);

  return (
    <Wrap>
      <ImportControls
        wholesaleKeys={wholesaleKeys}
        shopKeys={shopKeys}
        data={importedData}
        inputEl={inputEl}
        uploadFile={uploadFile}
        clickDeleteAll={clickDeleteAll}
        clearData={clearData}
        publishData={publishData}
        disabled={publishState === LOAD_STATES.PENDING || loading}
      />
      {publishState === LOAD_STATES.PENDING || loading ? (
        <Loader disableShrink />
      ) : null}
      {publishState !== LOAD_STATES.PENDING ? (
        <ImportTable
          wholesaleKeys={wholesaleKeys}
          shopKeys={shopKeys}
        />
      ) : null}
    </Wrap>
  );
};

ImportPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  ImportStore: PropTypes.object.isRequired,
  ShopsStore: PropTypes.object.isRequired,
  WholesaleStore: PropTypes.object.isRequired,
};

export default inject('ImportStore', 'WholesaleStore', 'ShopsStore')(
  WithConfirmAction(withSnackbar(observer(ImportPage))),
);
