import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Button,
  Grid2 as Grid,
  Modal,
  Typography,
  styled,
} from "@mui/material";

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

/**
 * A MUI Modal component for uploading a file.
 *
 * @param {boolean} open - Whether the modal is open or not
 * @param {Function} handleClose - A function to call when the modal is closed
 * @param {Object} props - Additional props to pass to the VisuallyHiddenInput component
 * @returns {React.ReactElement} - A React component representing the modal dialog
 */
function CustomFileUpload({ open, handleClose, ...props }) {
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
          <Typography variant="bmdr" color="blue.main" underline>
            Click to upload
          </Typography>
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            {...props}
            multiple
          />
        </Button>
        <Typography variant="bsr" color="dark.300">
          SVG, PNG, JPG or GIF (max. 3MB)
        </Typography>
      </Grid>
    </Modal>
  );
}

export default CustomFileUpload;