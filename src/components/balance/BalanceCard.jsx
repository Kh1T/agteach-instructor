import { Box, Divider, Stack, Typography } from "@mui/material";

function BalanceCard() {
  return (
    <>
      <Box
        sx={{
          // p:4,
          width: "100%",
          height: 225,
          borderRadius: 1,
          bgcolor: "grey.100",
          // "&:hover": {
          //   bgcolor: "primary.dark",
          // },
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
            $435.70
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
            $635.70
          </Typography>
        </Stack>
      </Box>
    </>
  );
}

export default BalanceCard;
