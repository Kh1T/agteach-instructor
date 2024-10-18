import { Box, Button, FormHelperText, Stack, Typography } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { useFormContext } from "react-hook-form";

export default function VideoUpload({
  name,
  lectureDuration,
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

  const [isError, setIsError] = useState(false);
  const [fileInfo, setFileInfo] = useState(
    file ? { name: file.name, size: (file.size / 1024).toFixed(2) + " KB" } : {}
  );

  const inputRef = useRef(null);
  const videoFile = watch(name);
  const [errorMessage, setErrorMessage] = useState('Video is requied')

  useEffect(() => {
    // If the videoFile exists, clear the error
    if (videoFile) {
      setIsError(false);
    }
  }, [videoFile]);

  const handleVideoUpload = (event) => {
    setIsError(false);
  
    const newFile = event.target.files[0];
    const MAX_FILE_SIZE = 150 * 1024 * 1024; // 150MB
    const MAX_VIDEO_DURATION = 10 * 60; //10mn
  
    // Check file size
    if (newFile.size > MAX_FILE_SIZE) {
      setIsError(true);
      setErrorMessage('Video size exceeds 150MB. Please ensure the video size is under 150MB');
      return;
    }
  
    const videoUrl = URL.createObjectURL(newFile);
    const video = document.createElement("video");
  
    // Load video metadata to get dimensions and duration
    video.src = videoUrl;
    video.onloadedmetadata = () => {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      const aspectRatio = (videoWidth / videoHeight).toFixed(2);
  
      // Check if the video is in landscape mode
      if (aspectRatio < 1) {
        setIsError(true);
        setErrorMessage('Video must be a landscape video');
        return;
      };
      
      // Check if the video duration exceeds the 10-minute limit
      const videoDuration = video.duration;
      if (videoDuration > MAX_VIDEO_DURATION) {
        setIsError(true);
        setErrorMessage('Video duration exceeds 10 minutes. Please upload a video under 10 minutes.');
        return;
      }
  
      console.log("Video duration:", video.duration);
      setValue(lectureDuration, video.duration.toString());
  
      // Set file info after successful video validation
      setFileInfo({
        name: newFile?.name || "",
        size: newFile ? (newFile.size / 1024).toFixed(2) + " KB" : "",
      });
  
      onFileChange(newFile);
      setValue(name, newFile);
    };
  
    // If no file is selected
    if (!newFile) {
      setIsError(true);
      setErrorMessage('No video file selected');
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
      {!isPreviewVisible && !videoFile ? (
        <>
          <Box
            sx={{
              backgroundColor: isError ? "red.light" : "grey.300",
              border: `2px dashed ${isError ? "red" : "grey"}`,
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
      {isError && (
        <FormHelperText sx={{ pl: 2 }} error>
          {errorMessage || 'Video is required'}
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
