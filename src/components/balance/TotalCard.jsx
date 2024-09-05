import { Box,  Stack, Typography } from "@mui/material";

function TotalCard({ total = "$1071.40" }) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: 140,
          borderRadius: 1,
          bgcolor: "grey.100",

        }}
      >
        <Stack direction="column" spacing={3} sx={{ mx: "30px", mt: "30px" }}>
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
              Total
            </Typography>
          </Stack>

          <Typography variant="blgsm" color="dark.400">
            {total}
          </Typography>
        </Stack>
      </Box>
    </>
  );
}

export default TotalCard;
