import { Box, Stack } from "@mui/material";
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
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Overview />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box>
              <RecentTransaction />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack direction="column" spacing={2}>
              <CardSale />
              <CardSale />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <TopPerformance />
          </Grid>
        </Grid>
      </Box>
    </>
  );
  const content = isApprove ? approvedContent : notApprovedContent;

  return content;
}
