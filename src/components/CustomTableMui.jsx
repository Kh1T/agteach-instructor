import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function CustomTableMui({ data }) {
    const {headers, rows} = data
  const content = (
    <TableContainer >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((title, id) => (
              <TableCell key={id}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {Object.values(row).map((cell, cellIndex)=>(
                <TableCell key={cellIndex} >{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  return content;
}
