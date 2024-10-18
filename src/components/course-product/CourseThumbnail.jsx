import { useState, useRef, useEffect } from "react";
import { Stack, Box, Typography, Button, FormHelperText } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function CourseThumbnail({
  name,
  onFileChange,
  isPreviewVisible,
  file,
  sx,
  icon,
  children,
  url,
}) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [selectedImage, setSelectedImage] = useState(
    file ? URL.createObjectURL(file) : null
  );
  console.log("url", url);
  useEffect(() => {
    setValue(name, url);
    setSelectedImage(url);
  }, [url]);

  const [fileInfo, setFileInfo] = useState(
    file
      ? { name: file.name, size: (file.size / 1024).toFixed(2) + " KB" }
      : { name: "Thumbnail Image", size: "N/A" }
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

  useEffect(() => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log("imageUrl", imageUrl);

      setSelectedImage(imageUrl);
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
      });
    } else if (url) {
      setSelectedImage(url);
    }
  }, [file, url]);

  return (
    <Box sx={{ my: 2 }}>
      {!isPreviewVisible && !photoFile ? (
        <>
          <Box
            sx={{
              backgroundColor: !!errors[name] ? "red.light" : "gray.300",
              border: `2px dashed ${!!errors[name] ? "red" : "gray"}`,
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
            <Typography variant="bmdsm">{fileInfo.name}</Typography>
            <Typography variant="bmdr">Size: {fileInfo.size}</Typography>
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

      {errors[name] && (
        <FormHelperText sx={{ pl: 2, mt: 1 }} error>
          {errors[name]?.message || "This field is required"}
        </FormHelperText>
      )}
      <input
        type="file"
        hidden
        accept="image/*"
        {...register(name, { required: "Image is required" })}
        onChange={handleFileUpload}
        ref={inputRef}
      />
    </Box>
  );
}
