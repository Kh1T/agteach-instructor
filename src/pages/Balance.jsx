import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import RecentTransaction from "../components/RecentTransaction";
import Grid from "@mui/material/Grid2";
import PieChartBalance from "../components/balance/PieChartBalance";
import BalanceCard from "../components/balance/BalanceCard";
import TotalCard from "../components/balance/TotalCard";
import QueryHeader from "../components/QueryHeader";
import { useState } from "react";
import CustomTableMui from "../components/CustomTableMui";
import CustomTableHeader from "../components/CustomTableHeader";
function BalancePage() {
  const [selectState, setSelectState] = useState("");
  const [value, setValue] = useState(0);

  const headers = ["No", "Name", "Date", "Amount"];
  function createData(...rest) {
    return { ...rest };
  }
  const rows = [
    createData(1, "Sok", "1-1-2024", "10$"),
    createData(2, "Sok", "1-1-2024", "10$"),
    createData(3, "Sok", "1-1-2024", "10$"),
    createData(4, "Sok", "1-1-2024", "10$"),
    createData(5, "Sok", "1-1-2024", "10$"),
  ];  const rowsProduct = [
    createData(1, "Sok", "1-1-2024", "10$"),
    createData(2, "Sok", "1-1-2024", "10$"),
    createData(3, "Sok", "1-1-2024", "10$"),
    createData(4, "Sok", "1-1-2024", "10$"),
    createData(5, "Sok", "1-1-2024", "10$"),
  ];
  return (
    <Stack spacing={5} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Box
            pt="30px"
            sx={{
              width: "100%",
              height: "410px",
              boxShadow: 2,
              borderRadius: 1,
            }}
          >
            <Stack direction="row" spacing={2} mx="30px">
              <Box
                pt={"60px"}
                sx={{
                  width: "100%",
                  backgroundColor: "grey.100",
                  boxShadow: 1,
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
          <Paper>
            <RecentTransaction />
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
          <Tab label="Course" id="tab-1" />
          <Tab label="Product" id="tab-2" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box>
          <QueryHeader
            useSelectState={[selectState, setSelectState]}
            selectData={["Newest", "Oldest"]}
          />
          <CustomTableMui data={{ headers, rows}} />
        </Box>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Box>
          <QueryHeader
            useSelectState={[selectState, setSelectState]}
            selectData={["Newest", "Oldest"]}
          />
          <CustomTableMui data={{ headers, rows }} />
        </Box>
      </CustomTabPanel>
    </Stack>
  );
}
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
export default BalancePage;
