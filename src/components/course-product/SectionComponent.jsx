import React, { useState } from "react";
import { Box, Stack, Typography, TextField } from "@mui/material";
import LectureComponent from "./LectureComponent"; // Import your LectureComponent
import ButtonComponent from "./ButtonInBox";
import { v4 as uuidv4 } from "uuid";
import { Delete } from "@mui/icons-material";
import { MoreVertRounded } from "@mui/icons-material";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useFormContext } from "react-hook-form";


  /**
   * SectionComponent renders a section of a course.
   * It renders the title of the section, a text field for the user to input the title of the section,
   * and a list of lectures in the section.
   * It also renders a button to add a new lecture to the section.
   * When the user clicks on the button to add a new lecture, it increments the number of all existing lectures by 1,
   * and then appends the new lecture to the end of the list, with the next number.
   * When the user clicks on a lecture, it renders the lecture component.
   * When the user clicks on the "X" button on a lecture, it deletes the lecture from the list.
   * When the user clicks on the "Delete" button on the section, it renders a modal to confirm if the user wants to delete the section.
   * When the user clicks on the "Confirm" button on the modal, it deletes the section.
   * @param {{id: string, onDelete: function, number: number, type: string}} props
   *   - id: the id of the section
   *   - onDelete: a function that deletes the section when called
   *   - number: the number of the section
   *   - type: the type of the section, either "section" or "lecture"
   * @returns {JSX.Element} a JSX element containing the section component
   */
export default function SectionComponent({ id, onDelete, number , type }) {
  const { register, formState: { errors } } = useFormContext();
  const [lectures, setLectures] = useState([
    { id: uuidv4(), number: 1, type: "lecture" },
  ]);

  // const handleAddLecture = () => {
  //   setLectures((prevLectures) => [
  //     ...prevLectures.map((lecture, index) => ({
  //       ...lecture,
  //       number: index + 1,
  //     })),
  //     { id: uuidv4(), number: prevLectures.length + 1, type: "lecture" }, // Add a new lecture with the next number
  //   ]);
  // };

  // const handleDeleteLecture = (id) => {
  //   setLectures((prevLectures) =>
  //     prevLectures
  //       .filter((lecture) => lecture.id !== id)
  //       .map((lecture, index) => ({
  //         ...lecture,
  //         number: index + 1,
  //       }))
  //   );
  // };

  const handleAddLecture = () => {
    setLectures((prevLectures) => [
      ...prevLectures,  // keep existing lectures unchanged
      { id: uuidv4(), number: prevLectures.length + 1, type: "lecture" },  // Add a new lecture
    ]);
  };

  const handleDeleteLecture = (id) => {
    setLectures((prevLectures) => prevLectures.filter((lecture) => lecture.id !== id));
  };
  
  

  const [showDelete, setShowDelete] = useState(false);

  const handleClickOnVert = () => {
    setShowDelete((prevShowDelete) => !prevShowDelete);
  };
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
    <Box bgcolor="grey.100" padding={2} mb={2}>
      <Stack
        position="relative"
        direction="row"
        padding={2}
        justifyContent="space-between"
      >
        <Typography variant="blgr">
          <strong>Section {number}:</strong> Write your section title below
        </Typography>
        <MoreVertRounded onClick={handleClickOnVert} />
        {showDelete && (
          <Stack
            onClick={ handleOpenModal } // Pass a function reference
            direction={"row"}
            boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.15)"}
            sx={{
              zIndex: 1,
              position: "absolute",
              top: 40,
              right: 20,
              bgcolor: "common.white",
              p: 1,
              gap: 1,
              justifyItems: "center",
            }}
          >
            <Delete color="red" />
            <Typography color="red">Delete</Typography>
          </Stack>
        )}
      </Stack>
      <TextField
        sx={{ my: 2 }}
        fullWidth
        id="outlined-controlled"
        label="eg: Introduction to indoor gardening"
        {...register(`section.${number}.title`, { required: "Title is required" })}
        error={!!errors.section?.[number]?.title}
        helperText={errors.section?.[number]?.title?.message}
        />
      <Box bgcolor="grey.300" padding={4} paddingTop={0}>
        {lectures.map((lecture) => (
          <LectureComponent
            key={lecture.id}
            id={lecture.id}
            number={lecture.number}
            onDelete={handleDeleteLecture}
            type={lecture.type}
          />
        ))}
        <ButtonComponent
          onClick={handleAddLecture}
          text="Add Lecture +"
          variant="outlined"
          flexEnd
          sx={{ px: 2 }}
        />
      </Box>
      <DeleteConfirmModal
        open={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        type={type}
      />
    </Box>
  );
}
