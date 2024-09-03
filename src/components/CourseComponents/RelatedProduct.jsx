import {
  Box,
  Divider,
  TextField,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import ProductCard from "./ProductCard";
import ButtonComponent from "../ButtonInBox";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import IconWithTitle from "../IconWithTitle";
export default function RelatedProduct() {
  return (
    <Box>
      <IconWithTitle
        title={"Related Product"}
        highlight={"Optional"}
        icon={<Inventory2OutlinedIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" fontWeight={"bold"}>
        Choose a feature image for your course
      </Typography>
      <Typography variant="subtitle2">
        Most of customer will decided to buy a course based on an image{" "}
      </Typography>
      <Box sx={{ my: 2, gap: 2, display: "flex", alignItems: "center" }}>
        <TextField
          sx={{ my: 2, minWidth: "300px" }}
          id="outlined-controlled"
          label="Search"
        />
        <ButtonComponent
          text={"SEARCH"}
          variant={"contained"}
          height={"56px"}
        />
      </Box>

      <ProductCard
        title={"Tool"}
        price={"100$"}
        src={"https://picsum.photos/id/122/200/400"}
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
