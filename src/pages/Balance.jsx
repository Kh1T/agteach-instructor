import { Box, Paper, Stack } from "@mui/material";
import TopPerformance from "../components/dashboard/TopPerformance";
import RecentTransaction from "../components/RecentTransaction";
import Grid from "@mui/material/Grid2";
import CardSale from "../components/dashboard/CardSale";
import Overview from "../components/dashboard/Overview";
import PieChartBalance from "../components/balance/PieChartBalance";
import BalanceCard from "../components/balance/BalanceCard";
import TotalCard from "../components/balance/TotalCard";
function BalancePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container  spacing={2}>
        <Grid size={8}>
          <Box pt="30px" sx={{ width: "100%", height: "410px", boxShadow: 2, borderRadius: 1 }}>
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
    </Box>
  );
}

export default BalancePage;
