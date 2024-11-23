// src/components/MyTable.js
import React from 'react'
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TablePagination, TableRow, Paper
} from '@mui/material';
import styles from './index.module.css'

export const TablePaginated = ({ children, table }) => {
    const {
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        emptyRows,
        headers,
        rows
    } = table;

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead sx={{ backgroundColor: '#dedede' }}>
                        <TableRow>
                            {headers?.map((header) => (
                                <TableCell
                                    key={header?.nome}
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 600
                                    }}
                                    width={header?.width ?? 'auto'}
                                >
                                    {header?.nome}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody className={styles.TableBody}>
                        {children}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={3} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows?.length ?? 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

