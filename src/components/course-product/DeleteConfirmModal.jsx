import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import RecycleBagIcon from "../../assets/go-green-grey-hanger-bag.png";
/**
 * DeleteConfirmModal component renders a modal dialog for the user to confirm
 * deletion of a given type (e.g. 'section', 'lecture', etc.).
 *
 * It takes the following props:
 *   - open: boolean indicating whether the dialog is open or not
 *   - onClose: function to call when the dialog is closed
 *   - onConfirm: function to call when the user confirms deletion
 *   - type: string indicating the type of item to be deleted
 *
 * The component renders a dialog with a confirm button and a cancel button.
 * When the confirm button is clicked, the onConfirm function is called and the
 * dialog is closed. When the cancel button is clicked, the onClose function is
 * called and the dialog is closed.
 *
 * The component also renders an icon and a message to the user, indicating the
 * type of item to be deleted and warning the user that the deletion is
 * permanent.
 */
const DeleteConfirmModal = ({ open, onClose, onConfirm, type }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={RecycleBagIcon}
          style={{ width: "136px", height: "136px", marginBottom: "10px" }}
        />
        <DialogTitle variant="blgsm" padding={"10px"}>
          Delete Confirmation
        </DialogTitle>
        <Typography variant="bxsr">
          Are you sure you want to delete this {type}? <br /> You won't be able
          to retrieve it back
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2, mb: "16px" }}>
        <Button
          sx={{
            bgcolor: "red.main",
          }}
          variant="contained"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          DELETE
        </Button>
        <Button
          sx={{ paddingY: 0.8 }}
          variant="outlined"
          size="small"
          onClick={onClose}
          color="primary"
        >
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmModal;
