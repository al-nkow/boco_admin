import React, { useState, useEffect, Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
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

const ImportTable = ({
  wholesaleKeys,
  shopKeys,
  ImportStore: { importedData },
}) => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const listener = () => {
      const browserWinHeight = window.innerHeight;
      const windowScrollValue = window.pageYOffset;
      const fullScroll = browserWinHeight + windowScrollValue;
      const wrap = document.getElementById('contentContainer');
      const contentHeight = wrap ? wrap.offsetHeight : 0;

      if (contentHeight - fullScroll < 250) {
        setCount(count + 40);
      }
    };

    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [count]);

  return (
    <>
      {importedData && (
        <>
          <Info>
            Внимание! Значения ширины, высоты и толщины указываются
            только в миллиметрах! Система автоматически убирает все
            буквы и пробелы. Таким образом 11 см - будет сохранено как
            11, то есть значение в миллиметрах! Так же и в остальных
            характеристиках товара все буквенные обозначения (кг, л,
            м2 и так далее) будут удалены. Поле Категория по
            возможности заполняйте в соответствии со списком категорий
            в одноименном разделе админ панели (пункт меню слева).
          </Info>
          <Wrap>
            <Box p={2}>
              <Table aria-label="shops table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Артикул boco</TableCell>
                    <TableCell>Категория</TableCell>
                    <TableCell>Название</TableCell>
                    <TableCell>Описание</TableCell>
                    <TableCell>Изображение</TableCell>
                    <TableCell>Марка</TableCell>
                    <TableCell>Вес (кг)</TableCell>
                    <TableCell>Объем (литр)</TableCell>
                    <TableCell>Площадь (м2)</TableCell>
                    <TableCell>Объем (м3)</TableCell>
                    <TableCell>Ширина (мм)</TableCell>
                    <TableCell>Высота (мм)</TableCell>
                    <TableCell>Толщина (мм)</TableCell>
                    {shopKeys.map((item, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Fragment key={i}>
                        <TableCell>{`${item} артикул`}</TableCell>
                        <TableCell>{`${item} цена`}</TableCell>
                        <TableCell>{`${item} ссылка`}</TableCell>
                      </Fragment>
                    ))}
                    {wholesaleKeys.map((item, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Fragment key={i}>
                        <TableCell>{`${item} цена`}</TableCell>
                        <TableCell>{`${item} количество`}</TableCell>
                      </Fragment>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {importedData.map(
                    (item, ind) =>
                      ind < count && (
                        // eslint-disable-next-line react/no-array-index-key
                        <TableRow key={ind}>
                          <TableCell>{item.bocoArticle}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>
                            {item.image && (
                              <Image src={item.image} alt="" />
                            )}
                          </TableCell>
                          <TableCell>{item.brand}</TableCell>
                          <TableCell>{item.weight}</TableCell>
                          <TableCell>{item.volumeL}</TableCell>
                          <TableCell>{item.area}</TableCell>
                          <TableCell>{item.volumeM}</TableCell>
                          <TableCell>{item.width}</TableCell>
                          <TableCell>{item.height}</TableCell>
                          <TableCell>{item.thickness}</TableCell>
                          {shopKeys.map((shop, i) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Fragment key={i}>
                              <TableCell>
                                {item[`${shop}Art`]}
                              </TableCell>
                              <TableCell>
                                {item[`${shop}Price`]}
                              </TableCell>
                              <TableCell>
                                {item[`${shop}Link`]}
                              </TableCell>
                            </Fragment>
                          ))}
                          {wholesaleKeys.map((wholesale, i) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Fragment key={i}>
                              <TableCell>
                                {item[`${wholesale}Price`]}
                              </TableCell>
                              <TableCell>
                                {item[`${wholesale}Quantity`]}
                              </TableCell>
                            </Fragment>
                          ))}
                        </TableRow>
                      ),
                  )}
                </TableBody>
              </Table>
            </Box>
          </Wrap>
        </>
      )}
    </>
  );
};

ImportTable.propTypes = {
  ImportStore: PropTypes.object.isRequired,
  shopKeys: PropTypes.array.isRequired,
  wholesaleKeys: PropTypes.array.isRequired,
};

export default inject('ImportStore')(observer(ImportTable));
