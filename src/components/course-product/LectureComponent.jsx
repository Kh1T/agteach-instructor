import { Delete } from "@mui/icons-material";
import { Box, Typography, TextField, Stack } from "@mui/material";
import { useState } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal";
import VideoUpload from "../new-course/VideoUpload";
import { useFormContext } from "react-hook-form";

export default function LectureComponent({
  id,
  onDelete,
  lectureNumber,
  sectionNumber,
  sectionId,
}) {
  const {
    register,
    unregister,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    unregister(
      `allSection[${sectionNumber - 1}].allLecture[${lectureNumber - 1}]`
    );
    handleCloseModal();
  };

  // Get video URL for editing purposes
  const videoUrl = watch(
    `allSection[${sectionNumber - 1}].allLecture[${lectureNumber - 1}].video`
  );
  
  return (
    <Box bgcolor='grey.300' sx={{ alignItems: "center", padding: '20px 30px 15px 30px' }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="bmdr">
          <strong>Lecture {lectureNumber}:</strong> Write your lecture title
          below
        </Typography>
        <Delete color="red" onClick={handleOpenModal} />
      </Stack>
      <TextField
        fullWidth
        label="Title of Lecture"
        sx={{ my: 2 }}
        variant="outlined"
        {...register(
          `allSection[${sectionNumber - 1}].allLecture[${lectureNumber - 1}].lectureName`,
          {
            required: "Title is required",
          }
        )}
        error={
          !!errors.allSection?.[sectionNumber - 1]?.allLecture?.[
            lectureNumber - 1
          ]?.lectureName
        }
        helperText={
          errors.allSection?.[sectionNumber - 1]?.allLecture?.[
            lectureNumber - 1
          ]?.lectureName?.message
        }
      />
      <VideoUpload
        name={`allSection[${sectionNumber - 1}].allLecture[${lectureNumber - 1}].video`}
        lectureDuration={`allSection[${sectionNumber - 1}].allLecture[${lectureNumber - 1}].lectureDuration`}
        onFileChange={(newFile) =>
          setValue(
            `allSection[${sectionNumber - 1}].allLecture[${lectureNumber - 1}].video`,
            newFile
          )
        }
        file={videoUrl ? new File([videoUrl], videoUrl) : null}
      />
      <DeleteConfirmModal
        open={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}

