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
        if (item[key]) item[key] = makeNumber(item[key]);
      });

      articleKeys.forEach(key => {
        if (item[key]) item[key] = clearSpaces(item[key]);
      });
    });
  };

  const prepareData = data => {
    return data.map(item => {
      const {
        bocoArticle,
        category,
        name,
        image,
        brand,
        weight,
        volumeL,
        area,
        volumeM,
        width,
        height,
        thickness,
        leruaArt,
        leruaPrice,
        leruaLink,
        obiArt,
        obiPrice,
        obiLink,
        maxidomArt,
        maxidomPrice,
        maxidomLink,
        petrovichArt,
        petrovichPrice,
        petrovichLink,
      } = item;
      const product = {
        bocoArticle,
        category,
        name,
        image,
        brand,
        weight,
        volumeL,
        area,
        volumeM,
        width,
        height,
        thickness,
      };
      const shops = {};
      if (leruaArt || leruaPrice || leruaLink)
        shops.lerua = { leruaArt, leruaPrice, leruaLink };
      if (obiArt || obiPrice || obiLink)
        shops.obi = { obiArt, obiPrice, obiLink };
      if (maxidomArt || maxidomPrice || maxidomLink)
        shops.maxidom = { maxidomArt, maxidomPrice, maxidomLink };
      if (petrovichArt || petrovichPrice || petrovichLink) {
        shops.petrovich = {
          petrovichArt,
          petrovichPrice,
          petrovichLink,
        };
      }
      return { product, shops };
    });
  };

  return (selectedFile, setData, setLoading) => {
    const reader = new FileReader();

    reader.onload = function(event) {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      //  workbook.SheetNames.forEach(function(sheetName) { ...
      const firstSheetName = workbook.SheetNames[0];
      const parsedData = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[firstSheetName],
      );

      formatData(parsedData);

      // ===========================================
      const readyData = prepareData(parsedData);
      console.log('READY DATA >>>>>>', readyData);
      // ===========================================

      setData(parsedData);
      setLoading(false);
    };

    reader.onerror = event => {
      const { code } = event.target.error;
      console.error(`File could not be read! Code ${code}`);
      setLoading(false);
    };

    reader.readAsBinaryString(selectedFile);
  };
}

export default useParseXls;
