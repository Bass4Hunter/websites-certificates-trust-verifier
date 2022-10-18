import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type Props = {
    data: Array<any>
}

export default function TrustStores(props: Props) {

    const displayColumn = (row: any) => {
        let display = []
        for (const [key, value] of Object.entries(row)) {
            display.push(<TableCell component="th" scope="row">
                {key as string}
            </TableCell>)
        }
        return display
    }

    const displayRow = (row: any) => {
        let display = []
        for (const [key, value] of Object.entries(row)) {
            display.push(<TableCell component="th" scope="row">
                {value as string}
            </TableCell>)
        }
        return display
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {displayColumn(props.data[0])}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {displayRow(row)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}