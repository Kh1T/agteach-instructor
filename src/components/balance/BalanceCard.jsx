import { Box, Divider, Stack, Typography } from "@mui/material";

function BalanceCard({ balance }) {
  const { course, product } = balance;
  return (
    <Box
      sx={{
        // p:4,
        width: "100%",
        height: 225,
        borderRadius: 1,
        bgcolor: "grey.100",
      }}
    >
      <Stack direction="column" spacing={2} sx={{ mx: "30px", mt: "30px" }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Typography variant="bssm" color="dark.300">
            Sale By
          </Typography>
          <Typography variant="bsr" color="dark.200">
            Course
          </Typography>
        </Stack>
        <Typography variant="blgsm" sx={{ color: "dark.400" }}>
          ${course || 0}
        </Typography>
        <Divider />
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Typography variant="bssm" color="dark.300">
            Sale By
          </Typography>
          <Typography variant="bsr" color="dark.200">
            Product
          </Typography>
        </Stack>

        <Typography variant="blgsm" color="dark.400">
          ${product || 0}
        </Typography>
      </Stack>
    </Box>
  );
}

export default BalanceCard;
