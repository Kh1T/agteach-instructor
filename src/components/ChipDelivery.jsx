import { Chip, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function ChipDelivery({ isDelivered }) {
  const label = isDelivered ? "Delivered" : "Not Yet Delivered";
  return (
    <Typography
      variant="bmdsm"
      sx={{ color: isDelivered ? "blue.main" : "red.main" }}
    >
      <Chip
        icon={<FiberManualRecordIcon  color= {isDelivered ? "blue.main" : "red.main"} />}
        // size="big"
        label={label}
        sx={{
          color: isDelivered ? "blue.main" : "red.main",
          backgroundColor: isDelivered ? "#348FFD10" : "#E2111C10",
        }}
      />
    </Typography>
  );
}
