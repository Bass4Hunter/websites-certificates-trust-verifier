import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import search from '../types/search';
import Item from './Item';

type dataSearch = {
    data: Array<search>
}

const Websites = (props: dataSearch) => {
    const { data } = props

    return <TableContainer component={Paper} sx={{ maxHeight: 300 , minWidth: 1000 }} >
        <Table stickyHeader aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">Microsoft Edge</TableCell>
                    <TableCell align="center">Google Chrome</TableCell>
                    <TableCell align="center">Mozilla Firefox</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, index) => (
                    <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.website}
                        </TableCell>
                        <TableCell align="center"><Item><Rating defaultValue={row.microsoft} max={3} readOnly /></Item></TableCell>
                        <TableCell align="center"><Item><Rating defaultValue={row.google} max={3} readOnly /> </Item></TableCell>
                        <TableCell align="center"> <Item><Rating defaultValue={row.mozilla} max={3} readOnly /></Item></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}

export default Websites