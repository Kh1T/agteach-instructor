import { Box, Modal, Typography, Fade, Link, SvgIcon } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import React from "react";
const style = {
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

const styleSecondBox = {
  border: "2px dashed",
  p: 4,
  display: "flex",
  itemAlign: "center",
  alignItems: "center", // Vertically center items
  justifyContent: "center", // Horizontally center items
  flexDirection: "column",
  gap: 1,
};

const AddPhotoModal = ({
  open,
  handleClose,
  handleFileUpload,
  handleFileDrop,
}) => {
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files.length) {
      handleFileDrop(files);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Box sx={style} onDrop={handleDrop} onDragOver={handleDragOver}>
          <Box sx={styleSecondBox}>
            <SvgIcon>
              <UploadFileIcon color="blue" />
            </SvgIcon>
            <Typography variant="bmdr">
              <Link
                sx={{ color: "blue.main", cursor: "pointer" }}
                onClick={handleFileUpload}
              >
                Click to Upload
              </Link>{" "}
              or Drag and Drop
            </Typography>
            <Typography variant="bmdr" gutterBottom>
              SVG, PNG, JPG or GIF (max. 3MB)
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddPhotoModal;
