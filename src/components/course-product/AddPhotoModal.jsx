import { Box, Modal, Typography, Fade, Link, SvgIcon } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import React from "react";

import {
  modalStyleFirstBox,
  modalStyleSecondBox,
} from "../../theme/courseProductStyles";

/**
 * AddPhotoModal component renders a modal with a drag and drop area and a file input
 *
 * It takes four props:
 *   - `open`: a boolean indicating whether the modal is open or not
 *   - `handleClose`: a function to call when the modal is closed
 *   - `handleFileUpload`: a function to call when a file is selected
 *   - `handleFileDrop`: a function to call when a file is dropped
 *
 * When a file is dropped, it calls `handleFileDrop` with the array of files
 * When the user clicks on the "Click to Upload" link, it calls `handleFileUpload`
 *
 * @param {Object} props - props object
 * @param {boolean} props.open - whether the modal is open or not
 * @param {Function} props.handleClose - a function to call when the modal is closed
 * @param {Function} props.handleFileUpload - a function to call when a file is selected
 * @param {Function} props.handleFileDrop - a function to call when a file is dropped
 * @returns {React.ReactElement} the AddPhotoModal component
 */
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
        <Box
          sx={modalStyleFirstBox}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Box sx={modalStyleSecondBox}>
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
