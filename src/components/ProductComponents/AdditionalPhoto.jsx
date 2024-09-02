import photoFileInput from "../../assets/product-page/Photos File Input.png";
import instructPhoto1 from "../../assets/product-page/product-photo-instruct1.png";
import instructPhoto2 from "../../assets/product-page/product-photo-instruct2.png";
import instructPhoto3 from "../../assets/product-page/product-photo-instruct3.png";
import instructPhoto4 from "../../assets/product-page/product-photo-instruct4.png";

import { Box, Button, Divider, Stack } from "@mui/material";
import React from "react";
import AddPhotoModal from "./AddPhotoModal";

export default function AdditionalPhoto() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ paddingBottom: "128px" }}>
      {" "}
      <h2>Additional Photo</h2>
      <Divider />
      <h3>Help your customer see the product better</h3>
      <Stack direction={"row"} gap={1} display={"flex"} height={"223px"}>
        <img src={instructPhoto1} />
        <img src={instructPhoto2} />
        <img src={instructPhoto3} />
        <img src={instructPhoto4} />
        <img onClick={handleOpen} src={photoFileInput} />
        <AddPhotoModal open={open} handleClose={handleClose} />
      </Stack>
      <p>
        Add more image will tend to help customer have an overview about your
        product more
      </p>
      <ul>
        <li>Please verify your course information before submitting</li>
        <li>
          By clicking CREATE PRODUCT you ensure that all the provided course
          above information is following AgTeach Terms and Policy
        </li>
      </ul>
      <Box display={"flex"}>
        <Button
          variant="contained"
          sx={{ marginRight: "auto", bgcolor: "blue.main" }}
        >
          Create Product
        </Button>
      </Box>
    </Box>
  );
}
