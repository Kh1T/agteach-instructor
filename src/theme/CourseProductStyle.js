import React, { forwardRef } from "react";
import { styled } from "@mui/material/styles";

const HiddenInput = styled("input")({
  clip: "rect(0, 0, 0, 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const VisuallyHiddenInput = forwardRef((props, ref) => (
  <HiddenInput type="file" ref={ref} {...props} />
));

export const style = {
  backgroundColor: "grey.300",
  display: "flex",
  alignItems: "center",
  padding: "32px",
  border: "2px dashed grey",
  cursor: "pointer",
  my: 4,
};

export const modalStyleFirstBox = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

export const modalStyleSecondBox = {
  border: "2px dashed",
  p: 4,
  display: "flex",
  itemAlign: "center",
  alignItems: "center", // Vertically center items
  justifyContent: "center", // Horizontally center items
  flexDirection: "column",
  gap: 1,
};

export const iconContainerStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  backgroundColor: "purple.main",
  padding: "4px",
};

export const UploadedPhotoStyle = {
  width: "220px",
  height: "220px",
  overflow: "hidden",
  position: "relative",
  marginX: 0.5,
  marginY: 1,
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export const NotYetUploadedPhotoStyle = {
  maxWidth: "200px",
  padding: "64px",
  paddingX: "12px",
  cursor: "pointer",
  alignItems: "center",
  justifyItems: "center",
  mb: 2,
  border: "2px dashed ",
};
