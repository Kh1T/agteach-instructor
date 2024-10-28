import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Grid2 as Grid, Typography, Stack, Divider } from "@mui/material";
import courseCover from "./../assets/dashboard-enrollment/course-cover.png";
import { useParams } from "react-router-dom";
import CustomTable from "../components/CustomTable";
import {
  useGetEnrollmentCourseQuery,
  useGetEnrollmentDetailsQuery,
} from "../services/api/courseApi";
import profileImg from "../assets/folder-sticker.png";

function EnrollmentDetailPage() {
  const { enrollmentId } = useParams();


  const { data: enrollmentData, isLoading: isLoadingPurchased } =
    useGetEnrollmentCourseQuery();

  const {
    data: enrollmentDetails,
    isLoading: isLoadingDetails,
    error,
  } = useGetEnrollmentDetailsQuery(enrollmentId);

  if (error) {
    console.error("API Error:", error);
  }

  // Process enrollment data for table rendering
  let enrollmentList = [];
  if (!isLoadingPurchased && enrollmentDetails) {
    const validEnrollment = Array.isArray(enrollmentDetails.students)
      ? enrollmentDetails.students
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

  // Combine customer data with enrollmentDetails
  const combinedEnrollmentDetails = useMemo(() => {
    if (enrollmentDetails?.enrollmentDetails && enrollmentDetails?.course) {
      return enrollmentDetails.enrollmentDetails.map((item) => ({
        ...item,
        customer: enrollmentDetails.course,
      }));
    }
    return [];
  }, [enrollmentDetails]);

  const tableData = enrollmentList.map((item) => ({
    Photo: (
      <img
        src={item.image_url || "https://via.placeholder.com/80"}
        alt="Product Image"
        width="80"
        height="80"
        style={{ borderRadius: "5px" }}
      />
    ),
    "Student Name": `${item.first_name || ""} ${item.last_name || ""}`,
    Email: item.email,
    Phone: item.phone,
    "Enrolled at": new Date(item.created_at).toISOString().split("T")[0],
  }));

  const course = enrollmentDetails?.course || [];

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
        <Box
          src={course.thumbnailUrl || profileImg}
          component="img"
          width={130}
          height={130}
          alt="Customer Image"
          sx={{ borderRadius: "5px" }}
        />
        <Stack gap={1}>
          <Typography variant="bxsmd">Course Name</Typography>
          <Typography variant="blgr">{course.name || "N/A"}</Typography>
          <Stack>
            <Typography variant="bxsmd">
              <Box component="strong">Created at</Box>:{" "}
              {course.createdAt
                ? new Date(course.createdAt).toISOString().split("T")[0]
                : "N/A"}
            </Typography>
            <Typography variant="bxsmd">
              <Box component="strong">Price</Box>:{" "}
              {course.price ? `$${course.price}` : "N/A"}
            </Typography>
          </Stack>
        </Stack>
      </Grid>

      <Divider sx={{ borderStyle: "dashed" }} />

      {/* Students Info */}
      <Grid container direction="column" gap={1}>
        <Typography variant="blgsm">Students</Typography>
        <Typography variant="bxsmd">
          Found ({tableData.length}) Students
        </Typography>

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
