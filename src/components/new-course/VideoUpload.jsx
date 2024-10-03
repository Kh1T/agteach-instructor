import { Box, Button, FormHelperText, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { useFormContext } from "react-hook-form";

export default function VideoUpload({ name }) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [videoUrl, setVideoUrl] = useState(null);
  const [fileInfo, setFileInfo] = useState({ name: "", size: "" });

  const inputRef = useRef(null);
  const videoFile = watch(name); 

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    console.log("Event:", event);  
    
    if (file && file.type.includes("video")) {
      setVideoUrl(URL.createObjectURL(file));
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
      })
      setValue(name, file); 
    }
  };

  const handleChange = () => {
    inputRef.current.click();
  };

  return (
    <Box sx={{ my: 2 }}>
      {!videoFile ? (
        <>
          <Box
            sx={{
              backgroundColor: !!errors[name] ? "red.light" : "grey.300",
              border: `2px dashed ${!!errors[name] ? "red" : "grey"}`,
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
              // onChange={handleVideoUpload}
            >
              Upload lecture video
              <input
                type="file"
                key={videoFile? 'uploaded': 'not-uploaded'}
                hidden
                accept="video/*"
                {...register(name, { required: "Video is required" })}
                onChange={handleVideoUpload}
                ref={inputRef}
              />
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
            component="video"
            controls
            src={videoUrl}
            sx={{ width: "180px", height: "120px", objectFit: "cover" }}
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
        <FormHelperText sx={{ pl: 2, mt: 1 }} error={!!errors[name]}>
          {errors[name]?.message}
        </FormHelperText>
      )}
    </Box>
  );
}
