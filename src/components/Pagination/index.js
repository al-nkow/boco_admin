import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';

const Pagination = ({
  pages,
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

  useEffect(() => {
    callback({
      page,
      limit: rowsPerPage,
    });
  }, [callback, page, rowsPerPage]);

  return (
    <TablePagination
      labelRowsPerPage={label}
      labelDisplayedRows={labelDisplayedRows}
      rowsPerPageOptions={perPageOptions}
      component="div"
      count={pages}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

Pagination.propTypes = {
  callback: PropTypes.func.isRequired,
  initLimit: PropTypes.number.isRequired,
  initPage: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  pages: PropTypes.number.isRequired,
};

export default Pagination;
