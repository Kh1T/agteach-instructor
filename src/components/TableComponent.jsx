import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
import { useState } from "react";

export default function TableCompoent({ data }) {
  // const tableHead = data.
  let headers = Object.keys(data[0]).map(
    (key) => key.charAt(0).toUpperCase() + key.slice(1)
  );
  let rows = data.map((item) => Object.values(item));
  console.log(headers);
  console.log(headers);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };
  const displayedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const content = (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey.100" }}>
              {headers.map((title, id) => (
                <TableCell key={id}>{title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                    // border: "1px dashed",
                    // "&:last-child tr, &:last-child th": { border: 0 } ,
                    // borderStyle: "dashed",
                }}
              >
                {Object.values(row).map((cell, cellIndex) => (
                  <TableCell key={cellIndex} sx={{
                      borderBottom: "1px dashed",
                      borderColor: "grey.300",

                  }}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
  return content;
}
