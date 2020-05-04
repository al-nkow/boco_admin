import XLSX from 'xlsx';

function useParseXls() {
  const sizeKeys = [
    'weight',
    'volumeL',
    'area',
    'volumeM',
    'width',
    'height',
    'thickness',
    'leruaPrice',
    'obiPrice',
    'maxidomPrice',
    'petrovichPrice',
  ];

  const articleKeys = [
    'bocoArticle',
    'leruaArt',
    'obiArt',
    'maxidomArt',
    'petrovichArt',
  ];

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
      sizeKeys.forEach(key => {
        if (item[key]) item[key] = makeNumber(item[key]) || null;
      });

      articleKeys.forEach(key => {
        if (item[key]) item[key] = clearSpaces(item[key]) || null;
      });

      if (item.category) item.category = item.category.trim();
      if (item.name) item.name = item.name.trim();

      const nameLastIndex = item.name ? item.name.length - 1 : 0;
      if (nameLastIndex && item.name[nameLastIndex] === '.')
        item.name = item.name.substring(0, nameLastIndex);
    });
  };

  return (selectedFile, setData, setLoading) => {
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
  };
}

export default useParseXls;
