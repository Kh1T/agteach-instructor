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
