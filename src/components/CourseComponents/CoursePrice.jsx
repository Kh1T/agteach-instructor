import {
  Divider,
  Box,
  TextField,
  Typography,
  ListItem,
  List,
} from "@mui/material";

import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import IconWithTitle from "../IconWithTitle";
export default function CoursePrice() {
  return (
    <Box className="container">
      <IconWithTitle title={"COURSE PRICE"} icon={<AttachMoneyOutlinedIcon sx={{color: 'common.white'}}/>} />
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" fontWeight={"bold"}>
        Tell us about your Course price
      </Typography>
      <Typography variant="subtitle2">
        Choosing a correct price strategy will help engage more customer
      </Typography>
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
      <List sx={{ listStyleType: "disc" }}>
        <ListItem>NOTE: AgTeach will deduct 20% from your total sale</ListItem>
        <ListItem>
          Example, if the product is $100 we will deduct $20 from your sale
        </ListItem>
      </List>
    </Box>
  );
}
