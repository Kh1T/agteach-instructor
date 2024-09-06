import { useState } from "react";
import { Stack, Box, Typography, Button, IconButton } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoModal from "./AddPhotoModal";

  /**
   * AddManyPhotos component renders an upload area for multiple photos
   * 
   * It renders a button with a label "Add Photos" and a count of the number of photos uploaded
   * When the button is clicked, it opens a modal with a drag and drop area and a file input
   * 
   * When a file is selected, it is added to the uploadedPhotos array and the file input is reset
   * If the number of photos exceeds 5, an error message is displayed
   * 
   * When a photo is removed, it is removed from the uploadedPhotos array
   * 
   * @returns A JSX element containing the AddManyPhotos component
   */
export default function AddManyPhotos() {
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // to trigger input reset

  const handleFileChange = (event) => {
    const newPhotos = Array.from(event.target.files);
    if (newPhotos.length + uploadedPhotos.length > 5) {
      setUploadError("Max 5 photos can be uploaded");
      return;
    }
    setUploadError("");
    setUploadedPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    setFileInputKey(Date.now()); // Reset file input key
  };

  const handleRemovePhoto = (index) => {
    setUploadedPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFileUpload = () => {
    document.getElementById("file-input").click();
  };

    const handleFileDrop = (files) => {
      const newPhotos = Array.from(files);
      if (newPhotos.length + uploadedPhotos.length > 5) {
        setUploadError("Max 5 photos can be uploaded");
        return;
      }
      setUploadError("");
      setUploadedPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    };

  return (
    <Stack paddingY={2} spacing={2}>
      {!uploadedPhotos.length ? (
        <Stack
          //   onClick={() => document.getElementById("file-input").click()}
          onClick={handleButtonClick}
          sx={{
            maxWidth: "190px",
            backgroundColor: "grey.300",
            padding: "64px",
            paddingX: "12px",
            border: "2px dashed grey",
            cursor: "pointer",
            alignItems: "center",
            justifyItems: "center",
            mb: 2,
          }}
        >
          <InsertPhotoIcon />
          <Typography variant="btr" color="gray">
            Upload up to 5 photos (png, jpg, webp)
          </Typography>
          <Typography variant="btr" color="gray">
            580 x 580 (Limit size: 1 MB)
          </Typography>
        </Stack>
      ) : (
        <Stack direction="row" flexWrap="wrap">
          {uploadedPhotos.map((file, index) => (
            <Box
              marginY={1}
              marginX={0.5}
              key={index}
              sx={{
                width: "220px",
                height: "220px",
                overflow: "hidden",
                position: "relative",
                "& img": {
                  width: "100%",
                  height: "100%",
                  objectFit: "fit",
                },
              }}
            >
              <Box
                component="img"
                src={URL.createObjectURL(file)}
                alt={`Uploaded ${index}`}
              />
              <Box
                onClick={() => handleRemovePhoto(index)}
                sx={{ position: "absolute", top: 1, right: 1, zIndex: 1 }}
              >
                <IconButton sx={{ backgroundColor: "common.white" }}>
                  <ClearIcon color="error" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Stack>
      )}
      {uploadError && <Typography color="red">{uploadError}</Typography>}
      {/* <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-input"
      /> */}
      <Button
        variant={uploadedPhotos.length !== 5 ? "outlined" : "contained"}
        color={uploadedPhotos.length !== 5 ? "error" : "success"}
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: "8px",
          maxWidth: "200px",
        }}
        // onClick={() => document.getElementById("file-input").click()}

        onClick={handleButtonClick}
      >
        <Typography variant="bssm">
          Add Photos {uploadedPhotos.length}/5
        </Typography>
      </Button>
      <AddPhotoModal
        open={modalOpen}
        handleClose={handleCloseModal}
        handleFileUpload={handleFileUpload}
        handleFileDrop={handleFileDrop}
      />
      <input
        id="file-input"
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
        key={fileInputKey}
      />
    </Stack>
  );
}
