import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Wrap = styled(Paper)`
  overflow: auto;
`;

const Image = styled.img`
  width: 100px;
`;

const Info = styled.div`
  margin: 10px 0 20px 0;
  font-size: 14px;
`;

const ExportTable = ({ data }) => {
  return (
    <>
      <Info>
        Внимание! Значиния ширины, высоты и толщины указываются только
        в миллиметрах! Система автоматически убирает все буквы и
        пробелы. Таким образом 11 см - будет сохранено как 11, то есть
        значение в миллиметрах! Так же и в остальных характеристиках
        товара все буквенные обозначения (кг, л, м2 и так далее) будут
        удалены. Поле Категория по возможности заполняйте в
        соответствии со списком категорий в одноименном разделе админ
        панели (пункт меню слева).
      </Info>
      <Wrap>
        <Box p={2}>
          <Table aria-label="shops table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Артикул boco</TableCell>
                <TableCell>Категория</TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Изображение</TableCell>
                <TableCell>Марка</TableCell>
                <TableCell>Вес (кг)</TableCell>
                <TableCell>Объем (литр)</TableCell>
                <TableCell>Площадь (м2)</TableCell>
                <TableCell>Объем (м3)</TableCell>
                <TableCell>Ширина (мм)</TableCell>
                <TableCell>Высота (мм)</TableCell>
                <TableCell>Толщина (мм)</TableCell>
                <TableCell>Леруа Мерлен артикул</TableCell>
                <TableCell>Леруа Мерлен цена</TableCell>
                <TableCell>Леруа Мерлен ссылка</TableCell>
                <TableCell>ОБИ артикул</TableCell>
                <TableCell>ОБИ цена</TableCell>
                <TableCell>ОБИ ссылка</TableCell>
                <TableCell>Максидом артикул</TableCell>
                <TableCell>Максидом цена</TableCell>
                <TableCell>Максидом ссылка</TableCell>
                <TableCell>Петрович артикул</TableCell>
                <TableCell>Петрович цена</TableCell>
                <TableCell>Петрович ссылка</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, ind) => (
                <TableRow key={ind}>
                  <TableCell>{item.bocoArticle}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {item.image && <Image src={item.image} alt="" />}
                  </TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.weight}</TableCell>
                  <TableCell>{item.volumeL}</TableCell>
                  <TableCell>{item.area}</TableCell>
                  <TableCell>{item.volumeM}</TableCell>
                  <TableCell>{item.width}</TableCell>
                  <TableCell>{item.height}</TableCell>
                  <TableCell>{item.thickness}</TableCell>
                  <TableCell>{item.leruaArt}</TableCell>
                  <TableCell>{item.leruaPrice}</TableCell>
                  <TableCell>{item.leruaLink}</TableCell>
                  <TableCell>{item.obiArt}</TableCell>
                  <TableCell>{item.obiPrice}</TableCell>
                  <TableCell>{item.obiLink}</TableCell>
                  <TableCell>{item.maxidomArt}</TableCell>
                  <TableCell>{item.maxidomPrice}</TableCell>
                  <TableCell>{item.maxidomLink}</TableCell>
                  <TableCell>{item.petrovichArt}</TableCell>
                  <TableCell>{item.petrovichPrice}</TableCell>
                  <TableCell>{item.petrovichLink}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Wrap>
    </>
  );
};

export default ExportTable;