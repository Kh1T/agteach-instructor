import { Box } from "@mui/material";
import AboutCourse from "../components/CourseComponents/AboutCourse";
import CourseContents from "../components/CourseComponents/CourseContents";
import CoursePrice from "../components/CourseComponents/CoursePrice";
import AddThumbnail from "../components/CourseComponents/AddThumbnail";
import RelatedProduct from "../components/CourseComponents/RelatedProduct";
import ButtonComponent from "../components/ButtonInBox";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function NewCoursePage() {
  return (
    <Box sx={{ width: "100%", paddingBottom: "200px" }}>
      <ButtonComponent
        text="Go Back"
        variant="text"
        color="black"
        startIcon={<ArrowBackIosIcon fontSize="small" color="gray" />}
      />
      <AboutCourse />
      <CourseContents />
      <CoursePrice />
      <AddThumbnail />
      <RelatedProduct />

      <ButtonComponent
        text={"CREATE COURSE"}
        variant={"contained"}
        bgcolor={"blue.main"}
      />
    </Box>
  );
}

export default NewCoursePage;
