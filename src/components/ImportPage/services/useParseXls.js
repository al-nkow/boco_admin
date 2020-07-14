import XLSX from 'xlsx';
import Papa from 'papaparse';

function useParseXls(setData, setLoading, wholeSaleKeys, shopKeys) {
  const coopKeys = wholeSaleKeys.reduce((res, item) => {
    if (item) {
      res.push(`${item}Price`);
      res.push(`${item}Quantity`);
    }
    return res;
  }, []);

  const priceKeys = shopKeys.reduce((res, item) => {
    if (item) res.push(`${item}Price`);
    return res;
  }, []);

  const articleKeys = shopKeys.reduce(
    (res, item) => {
      if (item) res.push(`${item}Art`);
      return res;
    },
    ['bocoArticle'],
  );

  const sizeKeys = [
    'weight',
    'volumeL',
    'area',
    'volumeM',
    'width',
    'height',
    'thickness',
  ];

  const numberKeys = [...sizeKeys, ...priceKeys, ...coopKeys];

  /**
   * Remove everything except letters, commas and dots and convert to a number
   */
  const makeNumber = val => {
    if (typeof val === 'number' && Number.isFinite(val)) return val;
    return +val.replace(/[^,.0-9]/g, '').replace(/,/g, '.');
  };

  /**
   * Remove spaces
   */
  const clearSpaces = val => {
    if (typeof val === 'number' && Number.isFinite(val)) return val;
    return val.replace(/\s/g, '');
  };

  const formatData = parsedData => {
    // Первые два элемента массива - это шапка таблицы => удалим их
    parsedData.splice(0, 2);

    parsedData.forEach(item => {
      numberKeys.forEach(key => {
        if (item[key]) item[key] = makeNumber(item[key]) || null;
      });

      articleKeys.forEach(key => {
        if (item[key]) item[key] = clearSpaces(item[key]) || null;
      });

      if (item.category) item.category = item.category.trim();
      if (item.name) item.name = item.name.trim();
      if (item.brand) item.brand = item.brand.trim();

      const nameLastIndex = item.name ? item.name.length - 1 : 0;
      if (nameLastIndex && item.name[nameLastIndex] === '.')
        item.name = item.name.substring(0, nameLastIndex);
    });
  };

  const parseXls = selectedFile => {
    const isCSV =
      selectedFile.name.toLowerCase().indexOf('csv') !== -1;

    if (isCSV) {
      Papa.parse(selectedFile, {
        header: true,
        complete: results => {
          const { data } = results;

          formatData(data);
          setData(data);
          setLoading(false);
        },
      });
    } else {
      const reader = new FileReader();

      // eslint-disable-next-line func-names
      reader.onload = function(event) {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        //  workbook.SheetNames.forEach(function(sheetName) { ...
        const firstSheetName = workbook.SheetNames[0];
        const parsedData = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[firstSheetName],
        );

        formatData(parsedData);
        setData(parsedData);
        setLoading(false);
      };

      reader.onerror = event => {
        const { code } = event.target.error;
        // eslint-disable-next-line no-console
        console.error(`File could not be read! Code ${code}`);
        setLoading(false);
      };

      reader.readAsBinaryString(selectedFile);
    }
  };

  return { parseXls };
}

export default useParseXls;
