import { Divider, Stack, Typography, Box } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useRef } from "react";
import WallpaperOutlinedIcon from "@mui/icons-material/WallpaperOutlined";
import IconWithTitle from "../CourseProductComponents/IconWithTitle";
import TextSection from "../CourseProductComponents/TextSection";
import PhotoPreview from "../CourseProductComponents/PhotoPreview";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const style = {
  backgroundColor: "grey.300",
  display: "flex",
  alignItems: "center",
  padding: "32px",
  border: "2px dashed grey",
  cursor: "pointer",
  my: 4,
};

export default function AddThumbnail() {
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };
  return (
    <Box>
      <IconWithTitle
        title={"Add Thumbnail"}
        icon={<WallpaperOutlinedIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <TextSection
        title="Choose a feature image for your course"
        description="Most of customer will decided to buy a course based on an image"
      />
      <PhotoPreview icon={<InsertPhotoIcon />}>
        <Typography color="gray">
          Upload Course thumbnail image, png, jpg, webp
        </Typography>
        <Typography color="gray">580 x 580 (Limit size: 1 MB)</Typography>
      </PhotoPreview>
    </Box>
  );
}
