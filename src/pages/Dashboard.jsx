import Grid from "@mui/material/Grid2";

import TopPerformance from "../components/dashboard/TopPerformance";
import Overview from "../components/dashboard/Overview";
import { ApplicationSubmitted } from "../components/dashboard/ApplicationSubmitted";
import { ApplicationRejected } from "../components/dashboard/ApplicationRejected";
import VerificationForm from "../components/dashboard/VerificationForm";
import { useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";

export default function DashboardPage() {
  const { isApproved, isRejected, isFormSubmitted, isLoading } = useSelector(
    (state) => state.approval
  );
  console.log(
    "on dashboard",
    isApproved,
    isRejected,
    isFormSubmitted,
    isLoading
  );

  if (isLoading) {
    return (
      <Box
        height="100vh"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isApproved) {
    if (isFormSubmitted && !isRejected) {
      return <ApplicationSubmitted />;
    }
    if (isFormSubmitted && isRejected) {
      return <ApplicationRejected />;
    }
    return <VerificationForm />;
  }

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 12 }}>
        <Overview />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <TopPerformance />
      </Grid>
    </Grid>
  );
}
