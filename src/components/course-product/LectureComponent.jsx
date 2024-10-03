import { Delete } from "@mui/icons-material";
import { Box, Typography, TextField, Stack } from "@mui/material";

import { useState } from "react";

import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import DeleteConfirmModal from "./DeleteConfirmModal";
import PhotoPreview from "./PhotoPreview";
import { useFormContext } from "react-hook-form";
import VideoUpload from "../new-course/VideoUpload";

/**
 * LectureComponent component renders a page for instructors to input lecture title and video.
 *
 * It renders the page with the following components:
 *   - Stack component with children:
 *     - Typography component with title and lecture number
 *     - Delete component with color red
 *   - TextField component for inputting lecture title
 *   - PhotoPreview component for previewing and uploading lecture video
 *   - DeleteConfirmModal component for confirming deletion of a lecture
 *
 * @prop {string} id The id of the lecture
 * @prop {function} onDelete The function to call when the lecture is deleted
 * @prop {number} number The number of the lecture
 * @prop {string} type The type of the lecture
 * @returns {React.ReactElement} The LectureComponent component
 */
export default function LectureComponent({ id, onDelete, number, type }) {
  const { register, formState: { errors } } = useFormContext();
  
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    handleCloseModal();
  };

  return (
    <Box sx={{ alignItems: "center", paddingTop: 4 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="bmdr">
          <strong>Lecture {number}:</strong> Write your lecture title below
        </Typography>
        <Delete
          color="red"
          onClick={handleOpenModal} // Call the onDelete handler passed from parent
        />
      </Stack>
      <TextField
        fullWidth
        label="Title of Lecture"
        sx={{ my: 2 }}
        variant="outlined"
        {...register(`lecture.${number}.title`, { required: "Title is required" })}
        error={!!errors.lecture?.[number]?.title}
        helperText={errors.lecture?.[number]?.title?.message}
      />
      <VideoUpload name={`lecture.${number}.video`} />
      <DeleteConfirmModal
        open={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        type={type}
      />
    </Box>
  );
}
