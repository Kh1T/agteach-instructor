import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useState } from "react";
import CustomTableHeader from "./CustomTableHeader";
import CustomTable from "./CustomTable";
import { recentData } from "../data/recentData";

function RecentTransaction() {
  const [transaction, setTransaction] = useState();
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
          content="Found(5) Items"
        />
        <Box sx={{ minWidth: 180 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select">Transaction</InputLabel>
            <Select
              id="demo-simple-select"
              value={transaction}
              onChange={(e) => setTransaction(e.target.value)}
              label="Transaction"
              defaultValue="10"
            >
              <MenuItem value={10}>Course</MenuItem>
              <MenuItem value={20}>Product</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>

      <CustomTable data={recentData} />
    </Box>
  );
}

export default RecentTransaction;
