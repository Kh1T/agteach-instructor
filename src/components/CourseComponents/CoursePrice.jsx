import {
  Divider,
  Box,
  TextField,
  Typography,
  ListItem,
  List,
  Stack,
} from "@mui/material";

import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import IconWithTitle from "../IconWithTitle";
import TextSection from "../TextSection";
export default function CoursePrice() {
  return (
    <Box className="container">
      <IconWithTitle
        title={"COURSE PRICE"}
        icon={<AttachMoneyOutlinedIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <TextSection
        title="Tell us about your Course price"
        description="Choosing a correct price strategy will help engage more customer"
      />
      <TextField
        fullWidth
        sx={{ my: 2 }}
        id="outlined-controlled"
        label="Price"
      />
      <Typography component={"ul"}>
        <Typography component={"li"}>
          NOTE: AgTeach will deduct 20% from your total sale
        </Typography>
        <Typography component={"li"}>
          Example, if the product is $100 we will deduct $20 from your sale
        </Typography>
      </Typography>
    </Box>
  );
}
