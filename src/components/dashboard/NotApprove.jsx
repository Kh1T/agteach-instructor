import { Box, Stack, Typography } from "@mui/material";
import IconNotApprove from "../../assets/dashboard-not-approve.svg";
function NotApprove() {
  return (
    <Box
      component="section"
      sx={{ backgroundColor: "grey.100", width: "100%", pb: 5 }}
    >
      <Stack
        direction="column"
        sx={{
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Box component="img" src={IconNotApprove} />
        <Stack spacing={2} sx={{ textAlign: "center", width: "360px" }}>
          <Typography variant="h4" color="primary">
            Your account is being reviewed by AgTeach Admin
          </Typography>
          <Typography variant="bmdr" color="dark.200">
            Please be patient. We will send you an email when this process is
            finished.
          </Typography>
          <Typography variant="btr" color="dark.200">
            More Info: agteach@gmai.com | 012 345 678
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
export default NotApprove;
