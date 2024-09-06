import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

import RecycleBagIcon from "../../assets/course-page/Go Green Grey Hanger Bag.svg";
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
        sx={{ textAlign: "center", justifyContent: "center", padding: 6 }}
      >
        <Box component="img" src={RecycleBagIcon} />
        <DialogTitle fontWeight={"bold"}>Delete Confirmation</DialogTitle>
        <Typography>Are you sure you want to delete this {type}?</Typography>
        <Typography>You won't be able to retrieve it back</Typography>
      </DialogContent>
      <DialogActions
        sx={{ justifyContent: "center", gap: 2, paddingBottom: 4 }}
      >
        <Button
          sx={{
            paddingY: 2,
            paddingX: 5,
            bgcolor: "red.main",
          }}
          variant="contained"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          <Typography variant="bxsmd">DELETE</Typography>
        </Button>
        <Button
          sx={{ paddingY: 2, paddingX: 5 }}
          variant="outlined"
          size="small"
          onClick={onClose}
          color="primary"
        >
          <Typography variant="bxsmd">CANCEL</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmModal;
