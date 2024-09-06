import { useState } from "react";
import { Stack, Box, Typography, Button } from "@mui/material";
  /**
   * PhotoPreview component renders a box with a dashed border and a "Choose File"
   * button. When a file is selected, it renders a preview of the file with its name
   * and size.
   *
   * It takes three props:
   *   - `sx`: style object for the preview box
   *   - `icon`: icon to be displayed in the preview box
   *   - `children`: children elements to be displayed in the preview box
   *
   * @param {Object} props - props object
   * @param {Object} props.sx - style object for the preview box
   * @param {React.ReactElement} props.icon - icon to be displayed in the preview box
   * @param {React.ReactElement} props.children - children elements to be displayed in the preview box
   * @returns {React.ReactElement} the PhotoPreview component
   */
export default function PhotoPreview({ sx, icon, children }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileInfo, setFileInfo] = useState({ name: "", size: "" });
  const [fileInputKey, setFileInputKey] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
      });
      resetFileInput();
    }
  };

  const resetFileInput = () => {
    setFileInputKey((prevKey) => prevKey + 1); // Reset file input by changing its key
  };

  const handleClick = () => {
    document.getElementById(`file-input-${fileInputKey}`).click(); // Trigger file input click
  };

  return (
    <>
      {selectedImage ? (
        <Stack
          direction="row"
          sx={{ width: "100%", textAlign: "start", mb: 2, gap: 2 }}
        >
          <Box
            component="img"
            src={selectedImage}
            alt="Selected Product"
            sx={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
          />
          <Stack gap={1}>
            <Typography variant="bmdsm">{fileInfo.name}</Typography>
            <Typography variant="bmdr">Size: {fileInfo.size}</Typography>
            <Button
              variant="outlined"
              sx={{
                px: 4,
                py: 1,
                width: "120px",
                border: "2px solid black",
                borderRadius: "8px",
              }}
              onClick={handleClick}
            >
              <Typography variant="bsr">Change</Typography>
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack
          sx={{
            backgroundColor: "grey.300",
            padding: "32px",
            border: "2px dashed grey",
            cursor: "pointer",
            alignItems: "center",
            justifyItems: "center",height:"100%",
            ...sx,
          }}
          onClick={handleClick}
        >
          {icon}

          {children}
        </Stack>
      )}
      <input
        id={`file-input-${fileInputKey}`} // Unique ID for each file input
        key={fileInputKey}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
      />
    </>
  );
}
