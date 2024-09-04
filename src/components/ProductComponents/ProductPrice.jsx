import {
  Divider,
  Box,
  TextField,
  Typography,
  ListItem,
  List,
} from "@mui/material";
import IconWithTitle from "../CourseProductComponents/IconWithTitle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TextSection from "../CourseProductComponents/TextSection";

export default function ProductPrice() {
  let name = "";
  return (
    <Box className="container">
      <IconWithTitle
        title={"Product Price"}
        icon={<AttachMoneyIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <TextSection
        title={"Tell us about your product price"}
        description={
          "Choosing a correct price strategy will help engage more customers"
        }
      />
      <TextField
        sx={{ my: 2 }}
        id="outlined-controlled"
        label="Price"
        value={name}
        // onChange={(event) => {
        //   setName(event.target.value);
        // }}
      />
      <Typography component={"ul"} >
        <Typography component={"li"}>NOTE: AgTeach will deduct 20% from your total sale</Typography>
        <Typography component={"li"}>
          Example, if the product is $100 we will deduct $20 from your sale
        </Typography>
      </Typography>
    </Box>
  );
}
