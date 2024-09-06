import { Box, Typography, Divider } from "@mui/material";
import ButtonComponent from "../course-product/ButtonInBox";
import IconWithTitle from "../course-product/IconWithTitle";
import BurstModeOutlinedIcon from "@mui/icons-material/BurstModeOutlined";
import SectionComponent from "../course-product/SectionComponent";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

/**
 * CourseContents component renders a list of sections, and allows adding/deleting of sections.
 *
 * It uses the SectionComponent component to render each section.
 *
 * When adding a new section, it increments the number of all existing sections by 1,
 * and then appends the new section to the end of the list, with the next number.
 *
 * When deleting a section, it removes the section from the list and decrements the number of all existing sections by 1.
 *
 * @returns a JSX element containing the CourseContents component.
 */

export default function CourseContents() {
  const [sections, setSections] = useState([
    { id: uuidv4(), number: 1, type: "section" },
  ]);

  /**
   * Add a new section to the course contents.
   *
   * When adding a new section, it increments the number of all existing sections by 1,
   * and then appends the new section to the end of the list, with the next number.
   */
  const handleAddSection = () =>
    setSections((prevSections) => [
      ...prevSections.map((section, index) => ({
        ...section,
        number: index + 1,
      })),
      { id: uuidv4(), number: prevSections.length + 1, type: "section" },
    ]);

  const handleDeleteSection = (id) =>
    setSections((prevSections) =>
      prevSections
        .filter((section) => section.id !== id)
        .map((section, index) => ({ ...section, number: index + 1 })),
    );

  return (
    <Box my={2}>
      <Typography variant="h3"> </Typography>
      <IconWithTitle
        title="Course Contents"
        icon={<BurstModeOutlinedIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      {sections.map((section) => (
        <SectionComponent
          key={section.id}
          id={section.id}
          number={section.number}
          onDelete={handleDeleteSection}
          type={section.type}
        />
      ))}
      <Divider />
      <ButtonComponent
        onClick={handleAddSection}
        text="Add Section +"
        flexEnd
        variant="contained"
      />
    </Box>
  );
}
