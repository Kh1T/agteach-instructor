import { Chip, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function ChipTable(){
    return(
        <Typography variant="bmdsm" sx={{ color: "red.main" }}>
        <Chip
          icon={<FiberManualRecordIcon />}
          size="big"
          label="Not Yet Delivered"
          sx={{ color: "red.main", backgroundColor: "#E2111C10" }}
        />
      </Typography>
    )
}