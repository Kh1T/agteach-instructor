import photoFileInput from "../../assets/product-page/Photos File Input.png";
import instructPhoto1 from "../../assets/product-page/product-photo-instruct1.png";
import instructPhoto2 from "../../assets/product-page/product-photo-instruct2.png";
import instructPhoto3 from "../../assets/product-page/product-photo-instruct3.png";
import instructPhoto4 from "../../assets/product-page/product-photo-instruct4.png";

import {
  Box,
  Button,
  Divider,
  ListItem,
  Stack,
  Typography,
  List,
} from "@mui/material";
import React from "react";
import AddPhotoModal from "./AddPhotoModal";

export default function AdditionalPhoto() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ paddingBottom: "128px" }}>
      {" "}
      <Typography variant="h3">Additional Photo</Typography>
      <Divider
        sx={{
          my: 2,
        }}
      />
      <Typography variant="h6" fontWeight={"bold"}>
        Help your customer see the product better
      </Typography>
      <Typography variant="subtitle2">
        Add more image will tend to help customer have an overview about your
        product more
      </Typography>
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
      <List>
        <ListItem>
          Please verify your course information before submitting
        </ListItem>
        <ListItem>
          By clicking .<strong>CREATE PRODUCT</strong>. you ensure that all the
          provided course above information is following AgTeach Terms and
          Policy
        </ListItem>
      </List>
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