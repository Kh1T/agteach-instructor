import Grid from "@mui/material/Grid2";

import TopPerformance from "../components/dashboard/TopPerformance";
import Overview from "../components/dashboard/Overview";
import { ApplicationSubmitted } from "../components/dashboard/ApplicationSubmitted";
import { ApplicationRejected } from "../components/dashboard/ApplicationRejected";
import VerificationForm from "../components/dashboard/VerificationForm";
import { useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";

/**
 * DashboardPage renders the main dashboard page for the application.
 *
 * If the user is loading their approval status, a loading screen is displayed.
 *
 * If the user is not approved, they are shown a verification form to fill out.
 * After submitting the verification form, the user is shown a success message.
 * If the user has submitted the verification form and has been rejected, they
 * are shown a rejection message.
 *
 * If the user is approved, they are shown an overview of their sales and top
 * performing products/courses.
 */
export default function DashboardPage() {
  const { isApproved, isRejected, isFormSubmitted, isApprovalLoading } =
    useSelector((state) => state.approval);

  if (isApprovalLoading) {
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
