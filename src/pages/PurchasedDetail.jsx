import { ChevronLeft } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CustomChip from "../components/CustomChip";

function PurchasedDetailPage() {
  return (
    <Stack alignItems="start" gap={5}>
      <Link>
        <Button variant="Text" startIcon={<ChevronLeft />}>
          <Typography variant="bsr" sx={{ textDecoration: "underline" }}>
            Go Back
          </Typography>
        </Button>
      </Link>
      <Stack
        direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" gap={3}>
          <Box
            src="https://images.blush.design/jJhw-B2TJJTgTuFYENbT?w=920&auto=compress&cs=srgb"
            component="img"
            width={130}
            height={130}
          />
          <Stack gap>
            <Typography variant="bxsr">Instructor Name</Typography>
            <Typography variant="blgr">Srey Roth</Typography>
            <Typography variant="bxsr">
              <Box component="strong">Email: </Box>roth@abc.xyz
            </Typography>
            <Typography variant="bxsr">
              <Box component="strong">Phone: </Box>0123456789
            </Typography>
            <Typography variant="bxsr">
              <Box component="strong">Address: </Box>St.6, plov veng sreng
            </Typography>
          </Stack>
        </Stack>
        <CustomChip label="Not Yet Delivered" sx={{ padding: "50px" }} />
      </Stack>
    </Stack>
  );
}

export default PurchasedDetailPage;
