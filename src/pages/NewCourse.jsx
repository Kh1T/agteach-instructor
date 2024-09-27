// import { Box, Button, Typography } from "@mui/material";
// import AboutCourse from "../components/new-course/AboutCourse";
// import CourseContents from "../components/new-course/CourseContents";
// import CoursePrice from "../components/new-course/CoursePrice";
// import AddThumbnail from "../components/new-course/AddThumbnail";
// import RelatedProduct from "../components/new-course/RelatedProduct";
// import ButtonComponent from "../components/course-product/ButtonInBox";

// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import { useNavigate } from "react-router";
// import { useForm } from "react-hook-form";

// function NewCoursePage() {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     clearErrors,
//     formState: { errors },
//   } = useForm();

//   const submitHandler = (data) => {
//     console.log(data);
//   };

//   return (
//     <Box sx={{ width: "100%", paddingBottom: "200px" }}>
//       <form onSubmit={handleSubmit(submitHandler)}>
//         <Button
//           variant="Text"
//           startIcon={<ArrowBackIosIcon fontSize="small" color="dark.300" />}
//           sx={{ textDecoration: "underline", color: "dark.300" }}
//           onClick={() => navigate(-1)}
//         >
//           <Typography variant="bsr">Go Back</Typography>
//         </Button>
//         <AboutCourse register={register} errors={errors} />
//         <CourseContents register={register} errors={errors} />
//         <CoursePrice register={register} errors={errors} />
//         <AddThumbnail
//           register={register}
//           errors={errors}
//           setValue={setValue}
//           clearErrors={clearErrors}
//         />
//         <RelatedProduct />
//         <ButtonComponent
//           text={"CREATE COURSE"}
//           variant={"contained"}
//           bgcolor={"purple.main"}
//         />
//       </form>
//     </Box>
//   );
// }

// export default NewCoursePage;

import { Box, Button, Typography } from "@mui/material";
import AboutCourse from "../components/new-course/AboutCourse";
import CourseContents from "../components/new-course/CourseContents";
import CoursePrice from "../components/new-course/CoursePrice";
import AddThumbnail from "../components/new-course/AddThumbnail";
import RelatedProduct from "../components/new-course/RelatedProduct";
import ButtonComponent from "../components/course-product/ButtonInBox";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { useAddCourseMutation } from "../services/api/courseApi";
import VideoUpload from "../components/new-course/VideoUpload";

function NewCoursePage() {
  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit } = methods;

  const [addCourse] = useAddCourseMutation();

  //   {
  //     "courseName" : "testing",
  //     "description": "testing create course",
  //     "price" : "123",
  //     "courseObjective": "make sure it work",
  //     "sectionName": "testing",
  //     "lectureName": "testing"
  // }

  const submitHandler = async (data) => {
    const { courseTitle, courseDescription, coursePrice, objective } = data;
    console.log("data", data);
    await addCourse({
      courseName: courseTitle,
      description: courseDescription,
      price: coursePrice,
      courseObjective: objective,
      sectionName: 'testing',
      lectureName: 'testing',
    }).unwrap();
  };

  return (
    <Box sx={{ width: "100%", paddingBottom: "200px" }}>
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
            text={"CREATE COURSE"}
            variant={"contained"}
            bgcolor={"purple.main"}
          />
        </form>
      </FormProvider>
    </Box>
  );
}

export default NewCoursePage;
