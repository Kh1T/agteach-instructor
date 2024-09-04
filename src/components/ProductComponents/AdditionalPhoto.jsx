import photoFileInput from "../../assets/product-page/Photos File Input.png";
import instructPhoto1 from "../../assets/product-page/product-photo-instruct1.png";
import instructPhoto2 from "../../assets/product-page/product-photo-instruct2.png";
import instructPhoto3 from "../../assets/product-page/product-photo-instruct3.png";
import instructPhoto4 from "../../assets/product-page/product-photo-instruct4.png";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import AddPhotoModal from "./AddPhotoModal";
import IconWithTitle from "../CourseProductComponents/IconWithTitle";
import TextSection from "../CourseProductComponents/TextSection";

export default function AdditionalPhoto() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <IconWithTitle
        title={"Additional Photo"}
        icon={<AddPhotoAlternateIcon sx={{ color: "common.white" }} />}
      />
      <Divider
        sx={{
          my: 2,
        }}
      />
      <TextSection
        title={"Help your customer see the product better"}
        description={
          "Add more image will tend to help customer have an overview about your product more"
        }
      />
      <Stack
        direction={"row"}
        gap={1}
        display={"flex"}
        height={"223px"}
        paddingY={4}
      >
        <Box component="img" src={instructPhoto1} />
        <Box component="img" src={instructPhoto2} />
        <Box component="img" src={instructPhoto3} />
        <Box component="img" src={instructPhoto4} />
        <Box component="img" onClick={handleOpen} src={photoFileInput} />
        <AddPhotoModal open={open} handleClose={handleClose} />
      </Stack>
      <Divider
        sx={{
          my: 2,
        }}
      />
      <Typography component={"ul"}>
        <Typography component={"li"}>
          Please verify your course information before submitting
        </Typography>
        <Typography component={"li"}>
          By clicking <strong>CREATE PRODUCT</strong> you ensure that all the
          provided course above information is following AgTeach Terms and
          Policy
        </Typography>
      </Typography>
    </Box>
  );
}
