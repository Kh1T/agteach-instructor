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
  useUpdateCourseMutation,
} from "../services/api/courseApi";
import { CustomAlert } from "../components/CustomAlert";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setId } from "../features/course/courseSlice";

function NewCoursePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.course.id);
  const productId = useSelector((state) => state.course.productId);
  const { action } = useParams();

  dispatch(setId(action));

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const [
    addCourse,
    { isLoading: isLoadingAddCourse, isSuccess: isSuccessAddCourse },
  ] = useAddCourseMutation();

  const { data, isLoading: isLoadingGetCourse } = useGetCourseQuery(action, {
    skip: action === "new",
  });

  const [
    updateCourse,
    { isLoading: isLoadingUpdateCourse, isSuccess: isSuccessUpdateCourse },
  ] = useUpdateCourseMutation();

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "",
    msg: "",
  });

  const handleBack = () => {
    // dispatch(setCourse(null));
    reset();
    navigate(-1);
  };

  useEffect(() => {
    if (action === "new") {
      // dispatch(setCourse(null));
      reset();
    } else if (data) {
      dispatch(setCourse(data.data));
    }
  }, [action, data, dispatch, reset]);

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
    let totalDuration = 0;

    // Append course details
    formData.append("courseName", courseName);
    formData.append("description", description);
    formData.append("price", coursePrice);
    formData.append("courseObjective", courseObjective);
    formData.append("allSection", JSON.stringify(allSection));
    formData.append("thumbnailUrl", courseThumbnail);
    formData.append("ProductSuggestionId", JSON.stringify(productId));

    let newSection = -1;
    let newLecture = 0;
    let newVidInSection = 0;

    const isNewLecture = (section, lecture) =>
      section.sectionId && !lecture.lectureId;
    const isExistingLecture = (section, lecture) =>
      section.sectionId &&
      lecture.lectureId &&
      typeof lecture.video === "object";
    const isNewVideo = (lecture) => typeof lecture.video === "object";

    allSection.forEach((section, sectionIndex) => {
      const isNewSection = !section.sectionId;
      console.log("isNewSection", isNewSection);

      if (isNewSection) {
        newSection++;
        newLecture = 0;
      }

      section.allLecture.forEach((lecture, lectureIndex) => {
        if (action === "new") {
          formData.append(
            `videos[${sectionIndex}][${lectureIndex}]`,
            lecture.video
          );
        } else {
          if (isExistingLecture(section, lecture)) {
            formData.append(
              `videos[${section.sectionId}][${lecture.lectureId}]`,
              lecture.video
            );
          } else if (isNewLecture(section, lecture)) {
            formData.append(
              `videos[${section.sectionId}][${newVidInSection}]`,
              lecture.video
            );
            newVidInSection++;
          } else if (isNewVideo(lecture)) {
            formData.append(
              `videos[${newSection}][${newLecture}]`,
              lecture.video
            );
            newLecture++;
          }
        }
        totalDuration += parseFloat(lecture.lectureDuration);
      });
    });

    formData.append("totalDuration", totalDuration);
    console.log("formData", [...formData]);

    try {
      console.log("before api call");

      if (action === "new") {
        console.log("new course");
        const response = await addCourse(formData).unwrap();
        console.log("response", response);
        setSnackbar({
          open: true,
          severity: "success",
          msg: "Course created successfully",
        });
      } else {
        console.log("update course");
        const response = await updateCourse({
          courseId: action,
          formData,
        }).unwrap();
        console.log("response", response);
        setSnackbar({
          open: true,
          severity: "success",
          msg: "Course updated successfully",
        });
      }
    } catch (error) {
      console.log("error", error);
      if (error)
        setSnackbar({
          open: true,
          severity: "error",
          msg: "Something went wrong",
        });
    }
  };

  return (
    <Box sx={{ width: "100%", paddingBottom: "200px" }}>
      <CustomAlert
        open={snackbar.open}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        label={snackbar.msg}
      />
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
                : isLoadingUpdateCourse
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
