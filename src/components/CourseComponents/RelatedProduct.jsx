import { Box, Divider, TextField, Typography, Stack } from "@mui/material";
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
      <Stack gap={1}>
        <Typography variant="blgsm">
          Choose a feature image for your course
        </Typography>
        <Typography variant="bsr">
          Most of customer will decided to buy a course based on an image{" "}
        </Typography>
      </Stack>
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

      <Typography component={"ul"}>
        <Typography component={"li"}>
          Please verify your course information before submitting
        </Typography>
        <Typography component={"li"}>
          By clicking <strong>CREATE COURSE</strong> you ensure that all the
          provided course above information is following AgTeach Terms and
          Policy
        </Typography>
      </Typography>
    </Box>
  );
}
