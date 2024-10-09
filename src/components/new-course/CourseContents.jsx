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

  // useEffect(() => {
  //   if (course && course.length > 0) {
  //     // Map the sections and lectures from the API response
  //     const mappedSections = course.map((item, index) => ({
  //       id: uuidv4(),
  //       number: index + 1,
  //       sectionName: item.section.name,
  //       allLecture: item.lecture ? [{
  //         lectureName: item.lecture.name,
  //         video: item.lecture.videoUrl
  //       }] : []
  //     }));
      
  //     setSections(mappedSections);

  //     // Set form values for each section and lecture
  //     mappedSections.forEach((section, sectionIndex) => {
  //       setValue(`allSection[${sectionIndex}].sectionName`, section.sectionName);
  //       section.allLecture.forEach((lecture, lectureIndex) => {
  //         setValue(`allSection[${sectionIndex}].allLecture[${lectureIndex}].lectureName`, lecture.lectureName);
  //         setValue(`allSection[${sectionIndex}].allLecture[${lectureIndex}].video`, lecture.video);
  //         // setValue(`allSection[${sectionIndex}].allLecture[${lectureIndex}]`, lecture.);
  //       });
  //     });
  //     console.log("mappedSections", mappedSections);
      
  //   }
  // }, [course, setValue]);

  useEffect(() => {
    if (course && course.length > 0) {
        // Sort the course data by lectureId
        const sortedCourse = [...course].sort((a, b) => a.lectureId - b.lectureId);

        // Create a mapping of sections to their lectures
        const sectionMap = {};

        sortedCourse.forEach(item => {
            const sectionId = item.section.sectionId;
            const lecture = item.lecture;

            // Initialize the section if it doesn't exist
            if (!sectionMap[sectionId]) {
                sectionMap[sectionId] = {
                    id: uuidv4(),
                    number: Object.keys(sectionMap).length + 1,
                    sectionName: item.section.name,
                    allLecture: []
                };
            }

            // Add the lecture to the corresponding section
            if (lecture) {
                const extension = lecture.videoUrl.split('.').pop();
                const fileName = lecture.name.split(' ').join('_');
                sectionMap[sectionId].allLecture.push({
                    lectureName: lecture.name,
                    video: `${fileName}.${extension}`
                });
            }
        });

        // Convert the section map to an array
        const mappedSections = Object.values(sectionMap);

        setSections(mappedSections);

        // Set form values for each section and lecture
        mappedSections.forEach((section, sectionIndex) => {
            setValue(`allSection[${sectionIndex}].sectionName`, section.sectionName);
            section.allLecture.forEach((lecture, lectureIndex) => {
                setValue(`allSection[${sectionIndex}].allLecture[${lectureIndex}].lectureName`, lecture.lectureName);
                setValue(`allSection[${sectionIndex}].allLecture[${lectureIndex}].video`, lecture.video);
            });
        });

        console.log("mappedSections", mappedSections);
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
      const updatedSections = prevSections.filter((section) => section.id !== id);
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
