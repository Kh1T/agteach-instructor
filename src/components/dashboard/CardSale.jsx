import { Box, Stack, Typography } from "@mui/material";

function CardSale() {
  return (
    <>
      <Box
        sx={{
            p:4,
          width: 460,
          height: 215,
          borderRadius: 1,
          bgcolor: "grey.100",
          // "&:hover": {
          //   bgcolor: "primary.dark",
          // },
          boxShadow: 1,
        }}
      >
        <Stack direction="column" spacing={2}>
        <Stack
          direction="row"
          sx={{
            
            justifyContent: "space-between",
          }}
        >
            <Typography>Sale</Typography>
            <Typography>Monthly</Typography>
        </Stack>
          <Typography variant="h4">$230,220</Typography>
          <Typography variant="blgsm">+55% since last month</Typography>
        </Stack>
      </Box>
    </>
  );
}

export default CardSale;
