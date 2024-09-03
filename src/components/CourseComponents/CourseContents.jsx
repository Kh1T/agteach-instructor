import {
  Box,
  Typography,
  TextField,
  Divider,
  Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ButtonComponent from "../ButtonInBox";
import IconWithTitle from "../IconWithTitle";
import BurstModeOutlinedIcon from "@mui/icons-material/BurstModeOutlined";
import LectureComponent from "../LectureComponent";


export default function CourseContents() {
  return (
    <Box my={2}>
      <Typography variant="h3"> </Typography>
      <IconWithTitle
        title={"Course Contents"}
        icon={<BurstModeOutlinedIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <Box bgcolor={"grey.100"}>
        <Stack direction={"row"} padding={2} justifyContent={"space-between"}>
          <Typography variant="h6">
            <strong>Section 1:</strong> Write your section title below
          </Typography>
          <MoreVertIcon />
        </Stack>
        <TextField
          sx={{ my: 2 }}
          fullWidth
          id="outlined-controlled"
          label="eg: Introduction to indoor gardening"
        />
        <LectureComponent />
        <Divider />
        <ButtonComponent text={"Add Section +"} flexEnd variant={"contained"} />
      </Box>
    </Box>
  );
}
