import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';

const Pagination = ({
  countItems,
  label,
  callback,
  initPage,
  initLimit,
}) => {
  const perPageOptions = [5, 10, 25, 50];
  const [page, setPage] = useState(initPage);
  const [rowsPerPage, setRowsPerPage] = useState(initLimit);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const labelDisplayedRows = ({ from, to, count }) =>
    `${from}-${to === -1 ? count : to} из ${count}`;

  const noItemsOnPage = countItems === rowsPerPage * page;

  useEffect(() => {
    if (noItemsOnPage) {
      setPage(page - 1);
      return;
    }
    callback({
      page,
      limit: rowsPerPage,
    });
  }, [callback, page, rowsPerPage, noItemsOnPage]);

  return (
    <>
      {!noItemsOnPage && countItems && (
        <TablePagination
          labelRowsPerPage={label}
          labelDisplayedRows={labelDisplayedRows}
          rowsPerPageOptions={perPageOptions}
          component="div"
          count={countItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </>
  );
};

Pagination.propTypes = {
  callback: PropTypes.func.isRequired,
  countItems: PropTypes.number,
  initLimit: PropTypes.number.isRequired,
  initPage: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

Pagination.defaultProps = {
  countItems: 0,
};

export default Pagination;
