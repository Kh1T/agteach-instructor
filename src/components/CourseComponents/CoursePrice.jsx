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
export default function CoursePrice() {
  return (
    <Box className="container">
      <IconWithTitle
        title={"COURSE PRICE"}
        icon={<AttachMoneyOutlinedIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <Stack gap={1}>
        <Typography variant="blgsm">Tell us about your Course price</Typography>
        <Typography variant="bsr">
          Choosing a correct price strategy will help engage more customer
        </Typography>
      </Stack>
      <TextField
        fullWidth
        sx={{ my: 2 }}
        id="outlined-controlled"
        label="Price"
        // value={name}
        // onChange={(event) => {
        //   setName(event.target.value);
        // }}
      />
      <Typography component={"ul"}>
        <Typography component={'li'}>NOTE: AgTeach will deduct 20% from your total sale</Typography>
        <Typography component={'li'}>
          Example, if the product is $100 we will deduct $20 from your sale
        </Typography>
      </Typography>
    </Box>
  );
}
