import React, { useState } from "react";
import { Box, Stack, Typography, TextField } from "@mui/material";
import LectureComponent from "./LectureComponent"; // Import your LectureComponent
import ButtonComponent from "./ButtonInBox";
import { v4 as uuidv4 } from "uuid";
import { Delete } from "@mui/icons-material";
import { MoreVertRounded } from "@mui/icons-material";
import { type } from "@testing-library/user-event/dist/type";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function SectionComponent({ id, onDelete, number , type }) {
  const [lectures, setLectures] = useState([
    { id: uuidv4(), number: 1, type: "lecture" },
  ]);

  const handleAddLecture = () => {
    setLectures((prevLectures) => [
      ...prevLectures.map((lecture, index) => ({
        ...lecture,
        number: index + 1,
      })),
      { id: uuidv4(), number: prevLectures.length + 1, type: "lecture" }, // Add a new lecture with the next number
    ]);
  };

  const handleDeleteLecture = (id) => {
    setLectures((prevLectures) =>
      prevLectures
        .filter((lecture) => lecture.id !== id)
        .map((lecture, index) => ({
          ...lecture,
          number: index + 1,
        }))
    );
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
