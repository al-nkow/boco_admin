import XLSX from 'xlsx';

function useParseXls() {
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

      // Первые два элемента массива - это шапка таблицы => удалим их
      parsedData.splice(0, 2);


      console.log('>>>>>>', parsedData);

      /*
        1. Удалить пробелы в полях Артикул и подобных
        2. В рахмерах и весах - удалить все буквы и пробелы
       */

      parsedData.forEach(item => {
        console.log('>>>>>>', item.width);
      });











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
