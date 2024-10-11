import { Box, Typography, Divider, Button } from "@mui/material";
import ButtonComponent from "../course-product/ButtonInBox";
import IconWithTitle from "../course-product/IconWithTitle";
import BurstModeOutlinedIcon from "@mui/icons-material/BurstModeOutlined";
import SectionComponent from "../course-product/SectionComponent";

import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

export default function CourseContents() {
  const [sections, setSections] = useState([
    { id: uuidv4(), number: 1, type: "section" },
  ]);
  const { unregister, setValue } = useFormContext();

  const course = useSelector((state) => state.course.courseData);

  useEffect(() => {
    if (course) {
      // Check if course has sections and lectures
      if (course.sections && course.sections.length > 0) {
        console.log("course.sections", course.sections);
  
        const updatedSections = course.sections.map((section, sectionIndex) => ({
          id: uuidv4(),
          number: sectionIndex + 1,
          sectionName: section.name,
          lectures: section.lectures.map((lecture, lectureIndex) => {
            const extension = lecture.videoUrl.split(".").pop(); // Get the file extension from the video URL
            const fileName = lecture.name.split(" ").join("_"); // Replace spaces with underscores
            const videoFileName = `${fileName}.${extension}`; // Combine lecture name and extension
  
            return {
              id: uuidv4(),
              lectureName: lecture.name,
              videoUrl: videoFileName, // Use the new formatted video file name
              number: lectureIndex + 1,
            };
          }),
        }));
  
        setSections(updatedSections);
  
        // Set form values for sections and lectures dynamically
        updatedSections.forEach((section, sectionIndex) => {
          setValue(
            `allSection[${sectionIndex}].sectionName`,
            section.sectionName
          );
          section.lectures.forEach((lecture, lectureIndex) => {
            setValue(
              `allSection[${sectionIndex}].allLecture[${lectureIndex}].lectureName`,
              lecture.lectureName
            );
            setValue(
              `allSection[${sectionIndex}].allLecture[${lectureIndex}].video`,
              lecture.videoUrl
            );
          });
        });
      }
    }
  }, [course, setValue]);
  

  const handleAddSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      { id: uuidv4(), number: prevSections.length + 1, type: "section" },
    ]);
  };

  const handleDeleteSection = (id) => {
    setSections((prevSections) => {
      const updatedSections = prevSections.filter(
        (section) => section.id !== id
      );
      updatedSections.forEach((section, index) => {
        section.number = index + 1;
      });

      unregister(`section[${updatedSections.length}]`);
      return updatedSections;
    });
  };

  return (
    <Box my={2}>
      <Typography variant="h3"> </Typography>
      <IconWithTitle
        title="Course Contents"
        icon={<BurstModeOutlinedIcon sx={{ color: "common.white" }} />}
        highlight="Sections"
      />
      <Divider sx={{ my: 2 }} />
      {sections.map((section) => (
        <SectionComponent
          key={section.id}
          id={section.id}
          number={section.number}
          onDelete={handleDeleteSection}
          type={section.type}
          lectureIndex={section.number - 1}
          sectionNumber={section.number}
          sectionName={section.sectionName}
          allLecture={section.allLecture}
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
