import { useState, useRef } from "react";
import CustomTable from "../components/CustomTable";
import QueryHeader from "../components/QueryHeader";
import { Stack, Typography, Box } from "@mui/material";
import { useGetEnrollmentCourseQuery } from "../services/api/courseApi";
import emptyProduct from "../assets/Spooky Stickers Sweet Franky.png";
import { useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";

function EnromentPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectState, setSelectState] = useState(0); // Default to "Newest"
  const label = "Sort";

  const searchRef = useRef();

  // Call API with the selected order and search term
  const {
    data: enrollmentData,
    isLoading,
    error,
  } = useGetEnrollmentCourseQuery({
    name: searchTerm,
    order: selectState,
  });

  console.log("order ", selectState);

  let enrollmentList = [];
  if (!isLoading && enrollmentData) {
    const validEnrollment = Array.isArray(enrollmentData.courseSaleHistory)
      ? enrollmentData.courseSaleHistory
      : [];

    // Sorting logic based on selectState
    const sortedEnrollment = [...validEnrollment].sort((a, b) => {
      const dateA = new Date(a.CreatedAt);
      const dateB = new Date(b.CreatedAt);

      if (selectState === 0) {
        // Newest first
        return dateB - dateA;
      } else {
        // Oldest first
        return dateA - dateB;
      }
    });

    // Map the sorted list
    enrollmentList = sortedEnrollment.map((item) => ({
      CourseName: item.CourseName,
      Price: `$${item.price}`,
      Student: item.student,
      Date: new Date(item.CreatedAt).toISOString().split("T")[0], // Format date
      View: (
        <CustomButton
          sx={{ backgroundColor: "blue.main" }}
          variant="contained"
          onClick={() => navigate(`/enrollment/${item.courseId}`)}
        >
          <Typography variant="bsr">View</Typography>
        </CustomButton>
      ),
    }));
  }

  console.log("Enrollment List: ", enrollmentList);

  // Handle Select Change
  const handleSelectChange = (event) => {
    setSelectState(Number(event.target.value)); // Ensure value is a number
  };

  // Handle Search functionality
  const handleSearch = () => {
    if (searchRef.current) {
      const term = searchRef.current.value;
      setSearchTerm(term);
    }
  };

  return (
    <Stack gap="30px">
      <QueryHeader
        label={label}
        useSelectState={[selectState, setSelectState]}
        selectData={["Newest", "Oldest"]}
        handleSelectChange={handleSelectChange}
        handleSearch={handleSearch}
        searchRef={searchRef}
      />

      {isLoading ? (
        <Typography>Loading Enrollment...</Typography>
      ) : error ? (
        <Typography>Error: {error.message}</Typography>
      ) : Array.isArray(enrollmentList) && enrollmentList.length > 0 ? (
        <CustomTable data={enrollmentList} />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height={"60vh"}
          sx={{ textAlign: "center" }}
        >
          <img
            src={emptyProduct}
            alt="emptyProduct"
            style={{ width: "200px", height: "200px", marginBottom: "10px" }}
          />
          <Typography variant="bmdr">No enrollment data available.</Typography>
        </Box>
      )}
    </Stack>
  );
}

export default EnromentPage;
