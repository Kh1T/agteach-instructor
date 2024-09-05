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
const DeleteConfirmModal = ({ open, onClose, onConfirm, type }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{ textAlign: "center", justifyContent: "center", padding: 6 }}
      >
        <Box component="img" src={RecycleBagIcon} />
        <DialogTitle fontWeight={"bold"}>Delete Confirmation</DialogTitle>
        <Typography>Are you sure you want to delete this {type}?</Typography>
        <Typography>You wont be able to retrieve it back</Typography>
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
