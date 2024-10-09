import { Box, Button } from "@mui/material";
import AboutCourse from "../components/new-course/AboutCourse";
import CourseContents from "../components/new-course/CourseContents";
import CoursePrice from "../components/new-course/CoursePrice";
import AddThumbnail from "../components/new-course/AddThumbnail";
import RelatedProduct from "../components/new-course/RelatedProduct";
import ButtonComponent from "../components/course-product/ButtonInBox";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { useAddCourseMutation, useGetCourseQuery } from "../services/api/courseApi";
import { CustomAlert } from "../components/CustomAlert";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../features/course/courseSlice";

function NewCoursePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.course.id)
  console.log("id", id);
  
  const methods = useForm();
  const { handleSubmit } = methods;
  const [addCourse, { isLoading: isLoadingAddCourse, isSuccess, isError, error }] =
    useAddCourseMutation();
  const { data, isLoading: isLoadingGetCourse } = useGetCourseQuery(id)

  // const { alertMessage, setAlertMessage } = useState();

  const location = useLocation();
  const course = location.state?.course
  // console.log("course", course);
  

  useEffect(() => {
    if (data) {
      dispatch(setCourse(data.data));
      console.log("data", data.data);
    }
  }, [data, dispatch]);

  const submitHandler = async (data) => {
    console.log("formData", data);
    const {
      courseName,
      description,
      coursePrice,
      courseObjective,
      allSection,
      courseThumbnail,
    } = data;

    // const submitData = {
    //   courseName: courseTitle,
    //   description: courseDescription,
    //   price: coursePrice,
    //   courseObjective: objective,
    //   allSection: allSection.map((section) => ({
    //     sectionName: section.sectionName || "untitled section",
    //     allLecture: section.allLecture.map((lecture) => ({
    //       lectureName: lecture.lectureName,
    //       video: lecture.video ? lecture.video : null,
    //     })),
    //   })),
    // };
    // console.log("courseTitle", { ...submitData });
    // console.log("courseDescription", courseDescription);

    const formData = new FormData();

    // console.log(submitData.allSection,'allsection')
    // Append course details
    formData.append("courseName", courseName);
    formData.append("description", description);
    formData.append("price", coursePrice);
    formData.append("courseObjective", courseObjective);
    formData.append("allSection", JSON.stringify(allSection));
    formData.append("thumbnailUrl", courseThumbnail);

    allSection.forEach((section) => {
      section.allLecture.forEach((lecture) => {
        formData.append("videos", lecture.video);
      });
    });


    console.log([...formData]);

    console.log("formData", [...formData]);

    try {
      console.log("before api call");

      const response = await addCourse(formData).unwrap();
      console.log("response", response);

      // setAlertMessage("Course created successfully");
    } catch (error) {
      console.log("error", error);
      // setAlertMessage('Course creation failed');
    }
  };

  return (
    <Box sx={{ width: "100%", paddingBottom: "200px" }}>
      {/* <CustomAlert
        open={isSuccess}
        severity={isSuccess ? "success" : "error"}
        message={alertMessage}
      /> */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Button
            variant="Text"
            startIcon={<ArrowBackIosIcon fontSize="small" color="dark.300" />}
            sx={{
              textDecoration: "underline",
              color: "dark.300",
              typography: "bmdr",
            }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>

          <AboutCourse />
          <CourseContents />
          <CoursePrice />
          <AddThumbnail />
          <RelatedProduct />
          <ButtonComponent
            type={"submit"}
            text={isLoadingAddCourse ? "CREATING..." : "CREATE COURSE"}
            variant={"contained"}
            bgcolor={"purple.main"}
          />
        </form>
      </FormProvider>
    </Box>
  );
}

export default NewCoursePage;
