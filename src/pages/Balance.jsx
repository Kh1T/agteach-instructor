import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import RecentTransaction from "../components/RecentTransaction";
import Grid from "@mui/material/Grid2";
import PieChartBalance from "../components/balance/PieChartBalance";
import BalanceCard from "../components/balance/BalanceCard";
import TotalCard from "../components/balance/TotalCard";
import QueryHeader from "../components/QueryHeader";
import { useState } from "react";
import CustomPanel from "../components/balance/CustomPanel";
import CustomTable from "../components/CustomTable";
import { products } from "../data/productsDummy";
function BalancePage() {
  const [selectState, setSelectState] = useState("");
  const [value, setValue] = useState(0);

  return (
    <Stack spacing={5} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Box
            pt="30px"
            sx={{
              width: "100%",
              height: "440px",
              borderRadius: 4,
              boxShadow: "0px 10px 33px 0px rgba(5,27,58,0.1)",
            }}
          >
            <Stack direction="row" spacing={2} mx="30px">
              <Box
                pt={"60px"}
                sx={{
                  width: "100%",
                  backgroundColor: "grey.100",
                  borderRadius: 1,
                }}
              >
                <PieChartBalance />
              </Box>
              <Stack width={"100%"} direction="column" spacing={2}>
                <BalanceCard />
                <TotalCard />
              </Stack>
            </Stack>
          </Box>
        </Grid>
        <Grid size={4}>
            <RecentTransaction />
        </Grid>
      </Grid>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
          <Tab label="Course" id="tab-1" />
          <Tab label="Product" id="tab-2" />
        </Tabs>
      </Box>
      <CustomPanel value={value} index={0}>
        <Box>
          <QueryHeader
            useSelectState={[selectState, setSelectState]}
            selectData={["Newest", "Oldest"]}
          />
          <CustomTable data={products} isPagination={true} />
        </Box>
      </CustomPanel>

      <CustomPanel value={value} index={1}>
        <Box>
          <QueryHeader
            useSelectState={[selectState, setSelectState]}
            selectData={["Newest", "Oldest"]}
          />
          <CustomTable data={products} isPagination={true} />
        </Box>
      </CustomPanel>
    </Stack>
  );
}

export default BalancePage;
