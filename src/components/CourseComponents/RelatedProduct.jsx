import { Box, Divider, TextField, Typography, Stack, DialogContent } from "@mui/material";
import ProductCard from "./ProductCard";
import ButtonComponent from "../CourseProductComponents/ButtonInBox";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import IconWithTitle from "../CourseProductComponents/IconWithTitle";
import TextSection from "../CourseProductComponents/TextSection";
export default function RelatedProduct() {
  return (
    <Box>
      <IconWithTitle
        title={"Related Product"}
        highlight={"Optional"}
        icon={<Inventory2OutlinedIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <TextSection
        title="Suggest products for practical learning"
        description="Recommend product that relevant to this course where students can buy for practical learning"
      />
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
        src={"https://picsum.photos/id/122/210/200"}
      />

      <Divider />

      <Typography component={"ul"} paddingY={2}>
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