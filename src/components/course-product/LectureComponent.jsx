import { Delete } from "@mui/icons-material";
import { Box, Typography, TextField, Stack } from "@mui/material";

import { useState } from "react";

import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import DeleteConfirmModal from "./DeleteConfirmModal";
import PhotoPreview from "./PhotoPreview";
import { useFormContext } from "react-hook-form";
import VideoUpload from "../new-course/VideoUpload";

export default function LectureComponent({
  id,
  onDelete,
  lectureNumber,
  sectionNumber,
  sectionId,
  type,
}) {
  const {
    register,
    unregister,
    formState: { errors },
    setValue,
  } = useFormContext();

  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [file, setFile] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    unregister(`allSection[${sectionNumber - 1}].allLecture[${lectureNumber - 1}]`);
    handleCloseModal();
  };

  const handleFileChange = (newFile) => {
    setFile(newFile);
    setIsPreviewVisible(!!newFile);
    setValue(
      `allSection[${sectionNumber - 1}].allLecture[${lectureNumber - 1}].video`,
      newFile
    );
  };

  return (
    <Box sx={{ alignItems: "center", paddingTop: 4 }}>
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
          !!errors.allSection?.[sectionNumber - 1]?.allLecture?.[lectureNumber - 1]
            ?.lectureName
        }
        helperText={
          errors.allSection?.[sectionNumber - 1]?.allLecture?.[lectureNumber - 1]
            ?.lectureName?.message
        }
      />
      <VideoUpload
        name={`allSection[${sectionNumber - 1}].allLecture[${lectureNumber - 1}].video`}
        onFileChange={handleFileChange}
        isPreviewVisible={isPreviewVisible}
        file={file}
      />
      <DeleteConfirmModal
        open={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        type={type}
      />
    </Box>
  );
}

// import { Delete } from "@mui/icons-material";
// import { Box, Typography, TextField, Stack } from "@mui/material";

// import { useState } from "react";

// import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
// import DeleteConfirmModal from "./DeleteConfirmModal";
// import PhotoPreview from "./PhotoPreview";
// import { useFormContext } from "react-hook-form";
// import VideoUpload from "../new-course/VideoUpload";

// export default function LectureComponent({
//   id,
//   onDelete,
//   lectureNumber,
//   sectionNumber,
//   sectionId,
//   type,
// }) {
//   const {
//     register,
//     unregister,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useFormContext();

//   const [isPreviewVisible, setIsPreviewVisible] = useState(false);
//   const [file, setFile] = useState(null);

//   const [modalOpen, setModalOpen] = useState(false);

//   const handleOpenModal = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   const handleConfirmDelete = () => {
//     onDelete(id);
//     unregister(`section[${sectionNumber - 1}].lecture[${lectureNumber - 1}]`);
//     handleCloseModal();
//   };

//   const handleFileChange = (newFile) => {
//     setFile(newFile);
//     setIsPreviewVisible(!!newFile);
//     // setValue(section[${sectionNumber - 1}].lecture[${lectureNumber - 1}].video, newFile);
//   };

//   return (
//     <Box sx={{ alignItems: "center", paddingTop: 4 }}>
//       <Stack direction="row" justifyContent="space-between">
//         <Typography variant="bmdr">
//           <strong>Lecture {lectureNumber}:</strong> Write your lecture title
//           below
//         </Typography>
//         <Delete color="red" onClick={handleOpenModal} />
//       </Stack>
//       <TextField
//         fullWidth
//         label="Title of Lecture"
//         sx={{ my: 2 }}
//         variant="outlined"
//         {...register(
//           `section[${sectionNumber - 1}].lecture[${lectureNumber - 1}].title`,
//           {
//             required: "Title is required",
//           }
//         )}
//         error={
//           !!errors.section?.[sectionNumber - 1]?.lecture?.[lectureNumber - 1]
//             ?.title
//         }
//         helperText={
//           errors.section?.[sectionNumber - 1]?.lecture?.[lectureNumber - 1]
//             ?.title?.message
//         }
//       />
//       <VideoUpload
//         name={`section[${sectionId}].lecture[${id}].video`}
//         onFileChange={() => handleFileChange(file)}
//         isPreviewVisible={isPreviewVisible}
//         file={file}
//       />
//       <DeleteConfirmModal
//         open={modalOpen}
//         onClose={handleCloseModal}
//         onConfirm={handleConfirmDelete}
//         type={type}
//       />
//     </Box>
//   );
// }

// {
//   "courseName" : "testing",
//   "description" : "testing bulkCreate course",
//   "price" : "12",
//   "courseObjective" : "make sure it work",
//   "data" : [
//   {
//     "sectionName": "testing",
//     "lectureAllName" : [
//       {"lectureName": "lectureName"},
//       {"lectureName": "lectureName"},
//       {"lectureName": "lectureName"}
//      ]
//     },
//     {
//       "sectionName": "testing",
//       "lectureAllName" : [
//       {"lectureName": "lectureName"}
//      ]
//     },
//     {
//         "sectionName": "testing",
//          "lectureAllName" : [
//         {"lectureName": "lectureName"}
//         ]
//      }
//    ]
// }
