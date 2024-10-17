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
    console.log("\n\nsection", sections)
    if (course) {
      // Check if course has sections and lectures
      if (course.sections && course.sections.length > 0) {
        console.log("course.sections", course.sections);

        const updatedSections = course.sections.map(
          (section, sectionIndex) => ({
            sectionId: section.sectionId,
            number: sectionIndex + 1,
            sectionName: section.name,
            lectures: section.lectures.map((lecture, lectureIndex) => {
              const extension = lecture.videoUrl.split(".").pop();
              const fileName = lecture.name.split(" ").join("_");
              const videoFileName = `${fileName}.${extension}`;
              const lectureDuration =
                (lecture.duration?.hours ?? 0) * 3600 +
                (lecture.duration?.minutes ?? 0) * 60 +
                (lecture.duration?.seconds ?? 0);

              return {
                lectureId: lecture.lectureId,
                lectureName: lecture.name,
                lectureDuration: lectureDuration,
                videoUrl: videoFileName,
                number: lectureIndex + 1,
              };
            }),
          })
        );

        setSections(updatedSections);

        // Set form values for sections and lectures dynamically
        updatedSections.forEach((section, sectionIndex) => {
          setValue(
            `allSection[${sectionIndex}].sectionName`,
            section.sectionName
          );
          setValue(`allSection[${sectionIndex}].sectionId`, section.sectionId);
          console.log("sectioId", section);

          section.lectures.forEach((lecture, lectureIndex) => {
            setValue(
              `allSection[${sectionIndex}].allLecture[${lectureIndex}].lectureName`,
              lecture.lectureName
            );
            setValue(
              `allSection[${sectionIndex}].allLecture[${lectureIndex}].video`,
              lecture.videoUrl
            );
            setValue(
              `allSection[${sectionIndex}].allLecture[${lectureIndex}].lectureId`,
              lecture.lectureId
            );
            setValue(
              `allSection[${sectionIndex}].allLecture[${lectureIndex}].lectureDuration`,
              lecture.lectureDuration
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
          allLecture={section.lectures}
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
