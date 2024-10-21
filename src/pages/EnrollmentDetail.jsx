import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Grid2 as Grid, Typography, Stack, Divider } from "@mui/material";
import courseCover from "./../assets/dashboard-enrollment/course-cover.png";
import { useParams } from "react-router-dom";
import CustomTable from "../components/CustomTable";
import { useGetEnrollmentCourseQuery, useGetEnrollmentDetailsQuery } from "../services/api/courseApi";
import { skipToken } from '@reduxjs/toolkit/query/react'; // To handle conditional query

function EnrollmentDetailPage() {
  const { courseId } = useParams();

  console.log("courseId from params:", courseId);
  const { data: enrollmentData, isLoading: isLoadingPurchased } = useGetEnrollmentCourseQuery();

  const { data: enrollmentDetails, isLoading: isLoadingDetails, error } =
    useGetEnrollmentDetailsQuery(courseId ? { courseId } : skipToken);

  console.log("Enrollment Details: ", enrollmentData);

  if (error) {
    console.error("API Error:", error);
  }

  // Process enrollment data for table rendering
  let enrollmentList = [];
  if (!isLoadingPurchased && enrollmentData) {
    const validEnrollment = Array.isArray(enrollmentData.courseSaleHistory)
      ? enrollmentData.courseSaleHistory
      : [];
    enrollmentList = validEnrollment.map((item) => ({
      ...item,
    }));
  }

  // Process enrollment details for table
  const enrollmentItems =
    enrollmentDetails?.enrollmentDetails &&
    Array.isArray(enrollmentDetails.enrollmentDetails)
      ? enrollmentDetails.enrollmentDetails
      : [];

  // Log processed enrollment items
  console.log("Processed Enrollment Items: ", enrollmentItems);

  const tableData = enrollmentItems.map((item) => ({
    Photo: item.product.imageUrl,
    category: item.product.categoryId,
    Quantity: item.quantity,
    price: `$ ${item.price}`,
    Total: `$ ${item.total}`,
    OrderDate: new Date(item.createdAt).toISOString().split("T")[0],
  }));

  return (
    <Grid container direction="column" gap={6}>
      {/* Go Back */}
      <Grid container alignItems="center">
        <ArrowBackIosIcon sx={{ fontSize: 14 }} />
        <Link to="/enrollment">
          <Typography variant="bsr">Go Back</Typography>
        </Link>
      </Grid>

      {/* Course Content */}
      <Grid container alignItems="center" gap={2}>
        <Box component="img" src={courseCover} />
        <Stack gap={1}>
          <Typography variant="bxsmd">Course Name</Typography>
          <Typography variant="blgr">
            Indoor Gardening and Hydroponics
          </Typography>
          <Stack>
            <Typography variant="bxsmd">
              <Box component="strong">Created at</Box>: 23/03/2024
            </Typography>
            <Typography variant="bxsmd">
              <Box component="strong">Price</Box>: $74.99
            </Typography>
          </Stack>
        </Stack>
      </Grid>

      <Divider sx={{ borderStyle: "dashed" }} />

      {/* Students Info */}
      <Grid container direction="column" gap={1}>
        <Typography variant="blgsm">Students</Typography>
        <Typography variant="bxsmd">Found ({tableData.length}) Students</Typography>

        {/* Display loading message, table data, or no data message */}
        {isLoadingDetails ? (
          <Typography>Loading Enrollment...</Typography>
        ) : tableData.length > 0 ? (
          <CustomTable data={tableData} />
        ) : (
          <Typography>No enrollment data available...</Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default EnrollmentDetailPage;
