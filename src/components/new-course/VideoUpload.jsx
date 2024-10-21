import { Box, Button, FormHelperText, Stack, Typography } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { VideoCameraBack } from "@mui/icons-material";

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

  const [showPreview, setShowPreview] = useState(isPreviewVisible);
  const [isError, setIsError] = useState(false);
  const [fileInfo, setFileInfo] = useState(
    file ? { name: file.name, size: "N/A" } : {}
  );
  const inputRef = useRef(null);
  const videoFile = watch(name);
  const [errorMessage, setErrorMessage] = useState("Video is required");

  useEffect(() => {
    // Clear errors if a video is uploaded
    if (videoFile) {
      setIsError(false);
    }
  }, [videoFile]);

  const handleVideoUpload = (event) => {
    const newFile = event.target.files[0];

    // If no file is selected (e.g., user cancels file dialog)
    if (!newFile) {
      return;
    }

    setIsError(false); // Clear any previous errors
    const MAX_FILE_SIZE = 150 * 1024 * 1024; // 150MB
    const MAX_VIDEO_DURATION = 10 * 60; // 10 minutes

    // Check file size
    if (newFile.size > MAX_FILE_SIZE) {
      setIsError(true);
      setErrorMessage(
        "Video size exceeds 150MB. Please ensure the video size is under 150MB."
      );
      return;
    }

    const videoUrl = URL.createObjectURL(newFile);
    const video = document.createElement("video");

    // Load video metadata to validate dimensions and duration
    video.src = videoUrl;
    video.onloadedmetadata = () => {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      const aspectRatio = (videoWidth / videoHeight).toFixed(2);

      // Check if the video is in landscape mode
      if (aspectRatio < 1) {
        setIsError(true);
        setErrorMessage("Video must be in landscape orientation.");
        return;
      }

      // Check video duration
      const videoDuration = video.duration;
      if (videoDuration > MAX_VIDEO_DURATION) {
        setIsError(true);
        setErrorMessage(
          "Video duration exceeds 10 minutes. Please upload a shorter video."
        );
        return;
      }

      // Video passed validation, set file info and duration
      setValue(lectureDuration, video.duration.toString());
      setFileInfo({
        name: newFile.name,
        size: (newFile.size / (1024*1024)).toFixed(2) + " MB",
      });

      // Call onFileChange to update the parent component
      onFileChange(newFile);
      setValue(name, newFile);
    };

    video.onerror = () => {
      // Handle any errors in loading the video file
      setIsError(true);
      setErrorMessage("Error loading video file. Please try another video.");
    };
  };

  const handleChange = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      {!showPreview && !videoFile ? (
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
            startIcon={<VideoCameraBack color="primary" />}
            sx={{ padding: "32px", color: "grey", typography: "bmdr" }}
            onClick={handleChange}
          >
            Upload lecture video (Limit size: 150MB)
          </Button>
        </Box>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: "100%", textAlign: "start" }}
        >
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
            <Typography variant="bmdr"><strong>Name :</strong> {fileInfo.name}</Typography>
            <Typography variant="bmdr"><strong>Size :</strong> {fileInfo.size}</Typography>
          </Stack>
        </Stack>
      )}
      {isError && (
        <FormHelperText sx={{ pl: 2 }} error>
          {errorMessage}
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
