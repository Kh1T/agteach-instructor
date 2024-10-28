import { useState, useRef, useEffect } from "react";
import { Stack, Box, Typography, Button, FormHelperText } from "@mui/material";

export default function PhotoPreview({
  name,
  onFileChange,
  isPreviewVisible,
  file,
  sx,
  icon,
  register,
  errors,
  watch,
  setValue,
  children,
  defaultValue,
}) {
  const [selectedImage, setSelectedImage] = useState(
    file ? URL.createObjectURL(file) : defaultValue || null
  );
  const [fileInfo, setFileInfo] = useState(
    file ? { name: file.name, size: (file.size / 1024).toFixed(2) + " KB" } : {}
  );

  const inputRef = useRef(null);
  const photoFile = watch(name);

  const handleFileUpload = (event) => {
    const newFile = event.target.files[0];

    if (newFile && newFile.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(newFile));
      setFileInfo({
        name: newFile.name,
        size: (newFile.size / 1024).toFixed(2) + " KB",
      });

      setValue(name, newFile);
      onFileChange && onFileChange(newFile);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleChange = () => {
    if (inputRef.current) {
      inputRef.current.click();
    } else {
      console.log("Input ref not found/null");
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      {!isPreviewVisible && !photoFile ? (
        <>
          <Box
            sx={{
              backgroundColor: !!errors.productCover ? "red.light" : "gray.300",
              border: `2px dashed ${!!errors.productCover ? "red" : "gray"}`,
              cursor: "pointer",
              alignItems: "center",
              justifyItems: "center",
              height: "100%",
              ...sx,
            }}
          >
            <Button
              component="label"
              fullWidth
              startIcon={icon}
              sx={{ padding: "32px" }}
              onClick={handleChange}
            >
              {children || "Upload photo"}
            </Button>
          </Box>
        </>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: "100%", textAlign: "start", mb: 2 }}
        >
          <Box
            component="img"
            src={selectedImage}
            alt="Selected"
            sx={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
          />
          <Stack spacing={1}>
            {!defaultValue ? (
              <>
                <Typography variant="bmdsm">Name: {fileInfo.name}</Typography>
                <Typography variant="bmdr">Size: {fileInfo.size}</Typography>
              </>
            ) : (
              <>
                <Typography variant="bmdsm">Name: product-cover-image</Typography>
                <Typography variant="bmdr">Size: 740.00 KB</Typography>
              </>
            )}
            <Button
              variant="outlined"
              sx={{
                py: 1,
                width: "120px",
                border: `2px solid black`,
                borderRadius: "8px",
              }}
              onClick={handleChange}
            >
              Change
            </Button>
          </Stack>
        </Stack>
      )}
      <input
        type="file"
        hidden
        accept="image/png, image/jpeg, image/jpg"
        {...register("productCover", { required: "Image is required" })}
        onChange={handleFileUpload}
        ref={inputRef}
      />
      {!photoFile && errors.productCover && (
        <FormHelperText sx={{ color: "error.main" }}>
          {errors.productCover.message}
        </FormHelperText>
      )}
    </Box>
  );
}
