import { Delete } from "@mui/icons-material";
import {
  Box,
  Typography,
  TextField,
  Divider,
  Stack,
  Button,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import ButtonComponent from "./ButtonInBox";
import { useRef } from "react";

import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const style = {
  backgroundColor: "grey.300",
  display: "flex",
  alignItems: "center",
  padding: "36px",
  border: "2px dashed grey",
  cursor: "pointer",
  my: 0,
};

export default function LectureComponent() {
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };
  return (
    <Box paddingLeft={6} padding={2} bgcolor={"grey.300"}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="bmdr">
          <strong>Lecture 1:</strong> Write your lecture title below
        </Typography>
        <Delete color="red" />
      </Stack>
      <TextField
        sx={{ my: 2 }}
        fullWidth
        id="outlined-controlled"
        label="Title of Lecture "
      />
      <Stack tabIndex={-1} sx={style} onClick={handleClick}>
        <UploadFileOutlinedIcon color="grey" />
        <Typography color="grey">Upload Lecture Video</Typography>

        <VisuallyHiddenInput
          type="file"
          ref={fileInputRef}
          onChange={(event) => console.log(event.target.files)}
          multiple
        />
      </Stack>
      <ButtonComponent text={"Add Lecture +"} variant={"outlined"} flexEnd />
    </Box>
  );
}
