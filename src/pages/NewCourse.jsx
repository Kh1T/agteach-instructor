import { Box , Button , Typography } from "@mui/material";
import AboutCourse from "../components/CourseComponents/AboutCourse";
import CourseContents from "../components/CourseComponents/CourseContents";
import CoursePrice from "../components/CourseComponents/CoursePrice";
import AddThumbnail from "../components/CourseComponents/AddThumbnail";
import RelatedProduct from "../components/CourseComponents/RelatedProduct";
import ButtonComponent from "../components/CourseProductComponents/ButtonInBox";

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
