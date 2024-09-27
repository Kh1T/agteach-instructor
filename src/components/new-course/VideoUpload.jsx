import { Box, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

export default function VideoUpload() {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [videoPreview, setVideoPreview] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("video", file); // Set the video file in the form state
      setVideoPreview(URL.createObjectURL(file)); // Create a preview URL for the video
    }
  };

  return (
    <Box>
      {videoPreview ? (
        <TextField
          type="file"
          sx={{ width: "100%", border: "1px dashed grey" }}
          slotProps={{ inputProps: { accept: "video/*" } }}
          {...register("video", { required: "Video is required" })}
          error={!!errors.video}
          helperText={errors.video?.message}
          onChange={handleVideoChange} // Handle file change and preview generation
        />
      ) : (
        <Box mt={2}>
          <Typography variant="subtitle2">Video Preview:</Typography>
          <video width="30%" height="auto" controls>
            <source src={videoPreview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      )}

      {/* Conditionally render the video preview if a file is selected */}
    </Box>
  );
}
