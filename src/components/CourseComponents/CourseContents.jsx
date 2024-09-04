import { Box, Typography, TextField, Divider, Stack } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ButtonComponent from "../CourseProductComponents/ButtonInBox";
import IconWithTitle from "../CourseProductComponents/IconWithTitle";
import BurstModeOutlinedIcon from "@mui/icons-material/BurstModeOutlined";
import LectureComponent from "../CourseProductComponents/LectureComponent";

import { v4 as uuidv4 } from "uuid"; // Import UUID

import { useState } from "react";

export default function CourseContents() {
  // State to manage the list of lectures with unique IDs
  let [lectures, setLectures] = useState([{ id: uuidv4(), number: 1 }]);

  const handleAddLecture = () => {
    setLectures((prevLectures) => [
      ...prevLectures.map((lecture, index) => ({
        ...lecture,
        number: index + 1,
      })),
      { id: uuidv4(), number: prevLectures.length + 1 }, // Add a new lecture with the next number
    ]);
  };

  const handleDeleteLecture = (id) => {
    setLectures((prevLectures) =>
      prevLectures
        .filter((lecture) => lecture.id !== id)
        .map((lecture, index) => ({ ...lecture, number: index + 1 }))
    );
  };

  return (
    <Box my={2}>
      <Typography variant="h3"> </Typography>
      <IconWithTitle
        title={"Course Contents"}
        icon={<BurstModeOutlinedIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <Box bgcolor={"grey.100"}>
        <Stack direction={"row"} padding={2} justifyContent={"space-between"}>
          <Typography variant="blgr">
            <strong>Section 1:</strong> Write your section title below
          </Typography>
          <MoreVertIcon />
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
        <Divider />
        <ButtonComponent text={"Add Section +"} flexEnd variant={"contained"} />
      </Box>
    </Box>
  );
}
