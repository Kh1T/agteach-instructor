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
