import { Box, Paper, Stack, styled } from "@mui/material";
import SimpleBarChart from "../components/dashboard/SimpleBarChart";
import TopPerformance from "../components/dashboard/TopPerformance";
import RecentTransaction from "../components/RecentTransaction";
import Grid from "@mui/material/Grid2";
import CardSale from "../components/dashboard/CardSale";
export default function DashboardPage() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));
  const content = (
    <> 
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={8}>
            <Paper>
              <h1>Overview</h1>
              <SimpleBarChart />
            </Paper>
          </Grid>
          <Grid size={4}>
            <Paper>
              <RecentTransaction />
            </Paper>
          </Grid>
          <Grid size={4} >
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
  return content;
}
