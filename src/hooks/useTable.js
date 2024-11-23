// src/hooks/useTable.js
import { useState } from 'react';

export const useTable = (headers, rows, initialRowsPerPage = 10) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return {
    headers,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    emptyRows,
    rows,
    paginatedRows: rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
  };
};

