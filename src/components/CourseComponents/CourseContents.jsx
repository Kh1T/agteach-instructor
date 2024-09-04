import { Box, Typography, TextField, Divider, Stack } from "@mui/material";
import ButtonComponent from "../CourseProductComponents/ButtonInBox";
import IconWithTitle from "../CourseProductComponents/IconWithTitle";
import BurstModeOutlinedIcon from "@mui/icons-material/BurstModeOutlined";
import SectionComponent from "../CourseProductComponents/SectionComponent";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function CourseContents() {
  const [sections, setSection] = useState([{ id: uuidv4(), number: 1 }]);

  const handleAddSection = () => {
    setSection((prevSections) => [
      ...prevSections.map((section, index) => ({
        ...section,
        number: index + 1,
      })),
      { id: uuidv4(), number: prevSections.length + 1 }, // Add a new lecture with the next number
    ]);
  };

  const handleDeleteSection = (id) => {
    setSection((prevSections) =>
      prevSections
        .filter((section) => section.id !== id)
        .map((section, index) => ({ ...section, number: index + 1 }))
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
      {sections.map((section) => (
        <SectionComponent
          key={section.id}
          id={section.id}
          number={section.number}
          onDelete={handleDeleteSection}
        />
      ))}
      <Divider />
      <ButtonComponent
        onClick={handleAddSection}
        text={"Add Section +"}
        flexEnd
        variant={"contained"}
      />
    </Box>
  );
}