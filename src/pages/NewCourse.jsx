import { Box, Button, Typography } from "@mui/material";
import AboutCourse from "../components/new-course/AboutCourse";
import CourseContents from "../components/new-course/CourseContents";
import CoursePrice from "../components/new-course/CoursePrice";
import AddThumbnail from "../components/new-course/AddThumbnail";
import RelatedProduct from "../components/new-course/RelatedProduct";
import ButtonComponent from "../components/course-product/ButtonInBox";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function NewCoursePage() {
  return (
    <Box sx={{ width: "100%", paddingBottom: "200px" }}>
      <Button
        variant="text"
        startIcon={<ArrowBackIosIcon fontSize="small" color="dark.300" />}
        sx={{ textDecoration: "underline", color: "dark.300" }}
      >
        <Typography variant="bsr">Go Back</Typography>
      </Button>
      <AboutCourse />
      <CourseContents />
      <CoursePrice />
      <AddThumbnail />
      <RelatedProduct />
      <ButtonComponent
        text={"CREATE COURSE"}
        variant={"contained"}
        bgcolor={"purple.main"}
      />
    </Box>
  );
}

export default NewCoursePage;
