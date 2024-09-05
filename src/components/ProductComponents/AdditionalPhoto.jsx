import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import IconWithTitle from "../CourseProductComponents/IconWithTitle";
import TextSection from "../CourseProductComponents/TextSection";
import AddManyPhoto from "../CourseProductComponents/AddManyPhoto";

export default function AdditionalPhotos() {
  return (
    <Box>
      <IconWithTitle
        title="Additional Photos"
        icon={<AddPhotoAlternateIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <TextSection
        title="Help customers see the product better"
        description="Adding more images can help customers have a better overview of your product."
      />
      <AddManyPhoto />
      <Divider sx={{ my: 2 }} />
      <Typography component="ul">
        <Typography component="li">
          Please verify your course information before submitting.
        </Typography>
        <Typography component="li">
          By clicking <strong>CREATE PRODUCT</strong>, you ensure that all the
          provided course information above is following AgTeach Terms and
          Policy.
        </Typography>
      </Typography>
    </Box>
  );
}
