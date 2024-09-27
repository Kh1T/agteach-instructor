import { Box, TextField } from "@mui/material";

export default function VideoUpload() {
  return (
    <Box>
      <TextField
        type="file"
        sx={{ width: "100%", border: "1px dashed grey" }}
        slotProps={{ inputProps: { accept: "video/*" },  }}
      />
    </Box>
  );
}
