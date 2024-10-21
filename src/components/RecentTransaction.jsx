import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CustomTableHeader from "./CustomTableHeader";
import CustomTable from "./CustomTable"; 

/**
 * RecentTransaction component
 * @description A component that displays a table of recent transactions with a select dropdown to filter by course or product
 * @returns {ReactElement} A JSX element representing the RecentTransaction component
 */
function RecentTransaction({ data }) {
  const [transaction, setTransaction] = useState();

  const { course, product } = data || [];
  console.log(course, product, "course, product");

  const mapData = (data) => {
    if (data.length === 0) return [];
    return data.map((item, id) => {
      return { Date: item.date, Name: item.name, Amount: `$ ${item.price}` };
    });
  };

  const courseRecentList = mapData(course) || [];
  const productRecentList = mapData(product) || [];

  const [recentTransactions, setRecentTransactions] =
    useState(courseRecentList);

  const handleSelect = (e) => {
    if (e.target.value === 10) {
      setRecentTransactions(courseRecentList);
    } else {
      setRecentTransactions(productRecentList);
    }
    setTransaction(e.target.value);
  };
 
  return (
    <Box
      sx={{
        height: "440px",
        px: "20px",
        borderRadius: 4,
        boxShadow: "0px 10px 33px 0px rgba(5,27,58,0.1)",
      }}
    >
      <Stack
        direction="row"
        sx={{
          pt: "30px",
          pb: "15px",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <CustomTableHeader
          title="Recent Transaction"
          content={`${recentTransactions.length} items`}
        />
        <Box sx={{ minWidth: 180 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select">Transaction</InputLabel>
            <Select
              id="demo-simple-select"
              value={transaction}
              onChange={handleSelect}
              label="Transaction"
              defaultValue="10"
            >
              <MenuItem value={10}>Course</MenuItem>
              <MenuItem value={20}>Product</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      {recentTransactions.length === 0 ? (
        <Typography>There is no transaction yet!</Typography>
      ) : (
        <CustomTable data={recentTransactions} />
      )}
    </Box>
  );
}

export default RecentTransaction;
