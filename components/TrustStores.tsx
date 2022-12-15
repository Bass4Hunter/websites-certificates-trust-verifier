import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TablePagination, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import SortIcon from "@mui/icons-material/Sort";

type Props = {
  data: Array<any>;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  maxWidth: 200,
  overflow: "auto",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TrustStores(props: Props) {
  const { data } = props;

  const [rows, setRows] = React.useState(data);

  React.useEffect(() => {
    setRows(data);
  }, [data]);

  const displayColumn = (row: any) => {
    let display = [];
    for (const [key, value] of Object.entries(row)) {
      display.push(<StyledTableCell>{key as string}</StyledTableCell>);
    }
    return display;
  };

  const displayRow = (row: any) => {
    let display = [];
    for (const [key, value] of Object.entries(row)) {
      display.push(<StyledTableCell>{JSON.stringify(value)}</StyledTableCell>);
    }
    return display;
  };

  function getMonthFromString(mon: string) {
    var d = Date.parse(mon + "1, 2012");
    if (!isNaN(d)) {
      return new Date(d).getMonth() + 1;
    }
    return -1;
  }

  const handleSort = () => {
    const sorted = rows.sort((e1, e2) => {
      if (e1["Valid From [GMT]"]) {
        if (e1["Valid From [GMT]"].includes(".")) {
          const date1 = e1["Valid From [GMT]"].split(".");
          const date2 = e2["Valid From [GMT]"].split(".");
          const s1 = date1[0] + "-" + date1[1] + "-" + date1[2];
          const s2 = date2[0] + "-" + date2[1] + "-" + date2[2];
          return new Date(s1) > new Date(s2) ? 1 : -1;
        }
        const date1 = e1["Valid From [GMT]"].split(" ");
        const date2 = e2["Valid From [GMT]"].split(" ");
        const s1 =
          date1[0] + "-" + getMonthFromString(date1[1]) + "-" + date1[2];
        const s2 =
          date2[0] + "-" + getMonthFromString(date2[1]) + "-" + date2[2];
        return new Date(s1) > new Date(s2) ? 1 : -1;
      }

      const date1 = e1["NotBefore"].split(" ");
      const date2 = e2["NotBefore"].split(" ");

      return new Date(date1) > new Date(date2) ? 1 : -1;
    });
    setRows([...sorted]);
  };

  return (
    <div
      style={{
        width: "100%",
        height: 900,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper>
        <Button variant="contained" onClick={handleSort}>
          Sort by valid period
          <SortIcon />
        </Button>
        <TableContainer sx={{ maxHeight: 800, maxWidth: 1900 }}>
          <Table aria-label="simple table" size="small" stickyHeader>
            <TableHead>
              <TableRow>{displayColumn(rows[0])}</TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any, index: any) => (
                <StyledTableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {displayRow(row)}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ float: "right", margin: 15 }}>
          <Typography variant="h5">Total: {rows.length}</Typography>
        </div>
      </Paper>
    </div>
  );
}
