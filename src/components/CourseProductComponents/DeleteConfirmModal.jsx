import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const DeleteConfirmModal = ({ open, onClose, onConfirm, type }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ textAlign: "center", justifyContent: "center" }}>
        <DeleteForeverIcon sx={{ fontSize: 150 }} />
        <DialogTitle>Delete Confirmation</DialogTitle>
        <Typography>Are you sure you want to delete this {type}?</Typography>
      </DialogContent>
      <DialogActions
        sx={{ justifyContent: "center", gap: 2, paddingBottom: 4 }}
      >
        <Button
          sx={{ padding: 2, paddingX: 4 }}
          variant="contained"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          color="error"
        >
          Delete
        </Button>
        <Button
          sx={{ padding: 2, paddingX: 4 }}
          variant="outlined"
          onClick={onClose}
          color="primary"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmModal;
