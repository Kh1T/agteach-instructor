import { Box, Button, FormHelperText, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { useFormContext } from "react-hook-form";

export default function VideoUpload({
  name,
  onFileChange,
  isPreviewVisible,
  file,
}) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [videoUrl, setVideoUrl] = useState(
    file ? URL.createObjectURL(file) : null
  );
  const [fileInfo, setFileInfo] = useState(
    file ? { name: file.name, size: (file.size / 1024).toFixed(2) + " KB" } : {}
  );

  const inputRef = useRef(null);
  const videoFile = watch(name);

  const handleVideoUpload = (event) => {
    const newFile = event.target.files[0];
    setFileInfo({
      name: newFile.name,
      size: (newFile.size / 1024).toFixed(2) + " KB",
    });
    onFileChange(newFile);
    setValue(name, newFile);
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
      {!isPreviewVisible && !videoFile ? (
        <>
          <Box
            sx={{
              backgroundColor: !!errors[name] ? "red.light" : "gray.300",
              border: `2px dashed ${!!errors[name] ? "red" : "gray"}`,
              cursor: "pointer",
              alignItems: "center",
              justifyItems: "center",
              height: "100%",
            }}
          >
            <Button
              component="label"
              fullWidth
              startIcon={<UploadFileOutlinedIcon />}
              sx={{ padding: "32px" }}
              onClick={handleChange}
            >
              Upload lecture video
            </Button>
          </Box>
        </>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: "100%", textAlign: "start" }}
        >
          <Stack direction={"row"} spacing={2}>
            <Button
              variant="outlined"
              sx={{
                width: "100px",
                border: `2px solid gray`,
                borderRadius: "8px",
              }}
              onClick={handleChange}
            >
              Change
            </Button>
            <Stack spacing={1}>
              <Typography variant="bmdsm">{fileInfo.name}</Typography>
              <Typography variant="bmdr">Size: {fileInfo.size}</Typography>
            </Stack>
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
        accept="video/*"
        {...register(name, { required: "Video is required" })}
        onChange={handleVideoUpload}
        ref={inputRef}
      />
    </Box>
  );
}
