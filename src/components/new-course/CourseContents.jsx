import { Box, Typography, Divider, Button } from "@mui/material";
import ButtonComponent from "../course-product/ButtonInBox";
import IconWithTitle from "../course-product/IconWithTitle";
import BurstModeOutlinedIcon from "@mui/icons-material/BurstModeOutlined";
import SectionComponent from "../course-product/SectionComponent";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function CourseContents() {
  const [sections, setSections] = useState([
    { id: uuidv4(), number: 1, type: "section" },
  ]);
  const { unregister } = useFormContext();

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


// import { Box, Typography, Divider, Button } from "@mui/material";
// import ButtonComponent from "../course-product/ButtonInBox";
// import IconWithTitle from "../course-product/IconWithTitle";
// import BurstModeOutlinedIcon from "@mui/icons-material/BurstModeOutlined";
// import SectionComponent from "../course-product/SectionComponent";

// import { v4 as uuidv4 } from "uuid";
// import { useState } from "react";
// import { useFormContext } from "react-hook-form";

// export default function CourseContents() {
//   const [sections, setSections] = useState([
//     { id: uuidv4(), number: 1, type: "section" },
//   ]);
//   const { unregister } = useFormContext();

//   const handleAddSection = () => {
//     setSections((prevSections) => [
//       ...prevSections,
//       { id: uuidv4(), number: prevSections.length + 1, type: "section" },
//     ]);
//   };

//   const handleDeleteSection = (id) => {
//     setSections((prevSections) => {
//       const updatedSections = prevSections.filter((section) => section.id !== id);
//       updatedSections.forEach((section, index) => {
//         section.number = index + 1; 
//       });

//       // unregister(section[${id}])
//       unregister(`section[${id}]`);
//       return updatedSections;
//     });

//   };

//   return (
//     <Box my={2}>
//       <Typography variant="h3"> </Typography>
//       <IconWithTitle
//         title="Course Contents"
//         icon={<BurstModeOutlinedIcon sx={{ color: "common.white" }} />}
//         highlight="Sections"
//       />
//       <Divider sx={{ my: 2 }} />
//       {sections.map((section) => (
//         <SectionComponent
//           key={section.id}
//           id={section.id}
//           number={section.number}
//           onDelete={handleDeleteSection}
//           type={section.type}
//         />
//       ))}
//       <Divider />
//       <ButtonComponent
//         onClick={handleAddSection}
//         text="Add Section +"
//         flexEnd
//         variant="contained"
//       />
//     </Box>
//   );
// }