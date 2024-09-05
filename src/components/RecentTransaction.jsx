 
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
  
  
  function RecentTransaction() {
 
    const [transaction, setTransaction] = useState();
  const data = [
    {
      no: 1,
      name: "Sok",
      date : '20-12-2020',
      amount : 10,
    },
    {
      no: 2,
      name: "Sok",
      date : '20-12-2020',
      amount : 10,
    },
    {
      no: 3,
      name: "Sok",
      date : '20-12-2020',
      amount : 10,
    },
    {
      no: 4,
      name: "Sok",
      date : '20-12-2020',
      amount : 10,
    },
    {
      no: 5,
      name: "Sok",
      date : '20-12-2020',
      amount : 10,
    },
    ]
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
        
        <CustomTable data={data} />
      </Box>
    ); 
  }
  
  export default RecentTransaction;
  