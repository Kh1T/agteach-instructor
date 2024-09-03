
import { Divider, Stack, Typography, Box } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useRef } from "react";
import WallpaperOutlinedIcon from "@mui/icons-material/WallpaperOutlined";
import IconWithTitle from "../IconWithTitle";

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
  padding: "32px",
  border: "2px dashed grey",
  cursor: "pointer",
  my: 4,
};

export default function AddThumbnail() {
    const fileInputRef = useRef(null); // Create a ref for the file input

    const handleClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click(); // Trigger the file input click
      }
    };
    return (
      <Box>
        <IconWithTitle title={"Add Thumbnail"} icon={<WallpaperOutlinedIcon sx={{color: 'common.white'}}/>}/>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" fontWeight={"bold"}>
          Choose a feature image for your course
        </Typography>
        <Typography variant="subtitle2">
          Most of customer will decided to buy a course based on an image{" "}
        </Typography>
        {/* <Box display={"flex"} gap={2}>
        <Box maxHeight={"65px"}>
          <img src="https://picsum.photos/id/255/65/65" />
        </Box>
        <Stack sx={{ margin: "0" }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              color: "gray",
            }}
          >
            1-grow-lights-LED-or-fluorescent-grow-lights.jpg
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "12px",
              color: "darkgray",
            }}
          >
            Size: 100KB
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: "black",
              borderColor: "black",
              marginRight: "auto",
              height:"24px",
            }}
          >
            Change
          </Button>
        </Stack>
      </Box> */}
        <Stack tabIndex={-1} sx={style} onClick={handleClick}>
          <InsertPhotoIcon />
          <Typography color="gray">
            Upload Course image, png, jpg, webp
          </Typography>
          <Typography color="gray">580 x 580 (Limit size: 1 MB)</Typography>

          <VisuallyHiddenInput
            type="file"
            ref={fileInputRef}
            onChange={(event) => console.log(event.target.files)}
            multiple
          />
        </Stack>
      </Box>
    );

}