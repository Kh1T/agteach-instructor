import { Box, Button } from "@mui/material";
import AboutCourse from "../components/new-course/AboutCourse";
import CourseContents from "../components/new-course/CourseContents";
import CoursePrice from "../components/new-course/CoursePrice";
import AddThumbnail from "../components/new-course/AddThumbnail";
import RelatedProduct from "../components/new-course/RelatedProduct";
import ButtonComponent from "../components/course-product/ButtonInBox";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import {
  useAddCourseMutation,
  useGetCourseQuery,
} from "../services/api/courseApi";
import { CustomAlert } from "../components/CustomAlert";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setId } from "../features/course/courseSlice";

function NewCoursePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.course.id);
  const productId = useSelector((state) => state.course.productId);
  const { action } = useParams();
  console.log("id", id);
  console.log("productId", productId);

  dispatch(setId(action));

  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const [
    addCourse,
    { isLoading: isLoadingAddCourse, isSuccess, isError, error },
  ] = useAddCourseMutation();
  const { data, isLoading: isLoadingGetCourse } = useGetCourseQuery(action, {
    skip: action === "new",
  });

  console.log('data', data);
  

  // const { alertMessage, setAlertMessage } = useState();

  const location = useLocation();
  const course = location.state?.course;
  // console.log("course", course);

  const handleBack = () => {
    dispatch(setCourse(null));
    navigate(-1);
  };

  // useEffect(() => {
  //   if (data) {
  //     dispatch(setCourse(data.data));
  //     reset(data.data)
  //     console.log("new data", data);
  //   } else {
  //     reset()
  //   }
  // }, [data, dispatch]);

  useEffect(() => {
    if (action === "new") {
      dispatch(setCourse(null));
    } else if (data) {
      dispatch(setCourse(data.data));
    }
  }, [action, data, dispatch]);
  

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

    const formData = new FormData();

    // Append course details
    formData.append("courseName", courseName);
    formData.append("description", description);
    formData.append("price", coursePrice);
    formData.append("courseObjective", courseObjective);
    formData.append("allSection", JSON.stringify(allSection));
    formData.append("thumbnailUrl", courseThumbnail);
    formData.append("ProductSuggestionId", JSON.stringify(productId));

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
            onClick={handleBack}
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
            text={
              action === "new"
                ? isLoadingAddCourse
                  ? "CREATING..."
                  : "CREATE COURSE"
                : isLoadingGetCourse
                  ? "UPDATING..."
                  : "UPDATE COURSE"
            }
            variant={"contained"}
            bgcolor={"purple.main"}
          />
        </form>
      </FormProvider>
    </Box>
  );
}

export default NewCoursePage;
