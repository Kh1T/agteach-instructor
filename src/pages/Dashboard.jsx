import { Box, Stack } from "@mui/material";
import TopPerformance from "../components/dashboard/TopPerformance";
import RecentTransaction from "../components/RecentTransaction";
import Grid from "@mui/material/Grid2";
import CardSale from "../components/dashboard/CardSale";
import Overview from "../components/dashboard/Overview";
import NotApprove from "../components/dashboard/NotApprove";
import FormApproval from "../components/dashboard/FormApproval";
export default function DashboardPage() {
  const isApprove = true;
  const notApprovedContent = <NotApprove />;
  const approvedContent = (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <Grid container spacing={4}>
        {/* <Grid size={{ xs: 12, md: 12 }}>
          <Overview />
        </Grid> */}
        {/* <Grid size={{ xs: 12, md: 4 }}>
          <Box>
            <RecentTransaction />
          </Box>
        </Grid> */}
        {/* <Grid size={{ xs: 12, md: 4 }}>
          <Stack direction="column" spacing={2}>
            <CardSale title="Monthly" sale="12,000" percent="10" />
            <CardSale title="Yearly" sale="15,000" percent="20" />
          </Stack>
        </Grid> */}
        {/* <Grid size={{ xs: 12, md: 12 }}>
          <TopPerformance />
        </Grid> */}
        <Grid size={{ xs: 12, md: 12 }}>
          <FormApproval />
        </Grid>
      </Grid>
    </Box>
  );
  const content = isApprove ? approvedContent : notApprovedContent;

  return content;
}
