import Grid from "@mui/material/Grid2";

import TopPerformance from "../components/dashboard/TopPerformance";
import Overview from "../components/dashboard/Overview";
import NotApprove from "../components/dashboard/NotApprove";

export default function DashboardPage() {
  const isApprove = false;
  const notApprovedContent = <NotApprove />;
  const approvedContent = (
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Overview />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <TopPerformance />
        </Grid>
      </Grid>
  );
  const content = isApprove ? approvedContent : notApprovedContent;

  return content;
}
