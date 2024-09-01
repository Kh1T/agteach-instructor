import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CustomTableMui from "./CustomTableMui";

function RecentTransaction() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const headers = ["No", "Name", "Date", "Amount"];
  const rows = [
    createData(1, "Sok", "1-1-2024", "10$"),
    createData(2, "Sok", "1-1-2024", "10$"),
    createData(3, "Sok", "1-1-2024", "10$"),
    createData(4, "Sok", "1-1-2024", "10$"),
  ];
  const data = { headers, rows };
  return (
    <>
      <Stack
        direction="row"
        sx={{
          p: 3,
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Stack
          direction="column"
          sx={{
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6">Recent Transaction</Typography>
          <Typography>Found(4) Items</Typography>
        </Stack>
        <Box sx={{ minWidth: 180 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Transaction</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="Transaction"
              label="Transaction"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <CustomTableMui data={data} />
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.fat}</TableCell>
                <TableCell>{row.carbs}</TableCell>
                <TableCell>{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </>
  );
}

export default RecentTransaction;
