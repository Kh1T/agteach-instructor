import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Button,
  Grid2 as Grid,
  Modal,
  Typography,
  styled,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

function CustomFileUpload({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          border: "2px dotted #778396",
          boxShadow: 24,
          p: 4,
        }}
      >
        <UploadFileIcon
          sx={{ fontSize: 40, borderColor: "blue.main", color: "blue.main" }}
        />
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          sx={{ border: "none" }}
          tabIndex={-1}
        >
          <Typography variant="subtitle1" color="blue.main" underline>
            Click to upload
          </Typography>
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => {
              if (event.target.files.length) {
                console.log("Files selected:", event.target.files);
              } else {
                console.log("No file selected.");
              }
            }}
            multiple
          />
        </Button>
        <Typography variant="subtitle1" color="dark.300">
          SVG, PNG, JPG or GIF (max. 3MB)
        </Typography>
      </Grid>
    </Modal>
  );
}

export default CustomFileUpload;
