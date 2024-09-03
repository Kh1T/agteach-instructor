import { Box, Paper, Stack, styled } from "@mui/material";
import SimpleBarChart from "../components/dashboard/SimpleBarChart";
import TopPerformance from "../components/dashboard/TopPerformance";
import RecentTransaction from "../components/RecentTransaction";
import Grid from "@mui/material/Grid2";
import CardSale from "../components/dashboard/CardSale";
import Overview from "../components/dashboard/Overview";
import NotApprove from "../components/dashboard/NotApprove";
export default function DashboardPage() {
  const isApprove = true;
  const notApprovedContent = <NotApprove />;
  const approvedContent = (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={8}>
            <Overview />
          </Grid>
          <Grid size={4}>
            <Paper>
              <RecentTransaction />
            </Paper>
          </Grid>
          <Grid size={4}>
            <Stack direction="column" spacing={2}>
              <CardSale />
              <CardSale />
            </Stack>
          </Grid>
          <Grid size={8}>
            <TopPerformance />
          </Grid>
        </Grid>
      </Box>
    </>
  );
  const content = isApprove ? approvedContent : notApprovedContent;

  return content;
}
