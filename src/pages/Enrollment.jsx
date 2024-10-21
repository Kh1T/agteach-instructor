import { useState, useRef } from "react";
import CustomTable from "../components/CustomTable";
import QueryHeader from "../components/QueryHeader";
import { Stack, Typography, Box } from "@mui/material";
import { useGetEnrollmentCourseQuery } from "../services/api/courseApi";
import emptyProduct from "../assets/Spooky Stickers Sweet Franky.png";

function EnromentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectState, setSelectState] = useState();
  const { data: enrollmentData, isLoading, error } = useGetEnrollmentCourseQuery({
    name: searchTerm,
    order: selectState,
  });
  const searchRef = useRef();
  const label = "Sort";

  let enrollmentList = [];
  if (!isLoading && enrollmentData && enrollmentData.data) {
    const validPurchased = Array.isArray(enrollmentData.data) ? enrollmentData.data : [];
    enrollmentList = validPurchased.map((item) => ({
      CourseName: item.CourseName,
      Price: `$ ${item.price}`,
      Student: item.student,
      Date : new Date(item.createdAt).toISOString().split("T")[0],
    }));
  }

  const handleSelectChange = (event) => {
    setSelectState(event.target.value);
  };

    // Handle Search functionality
    const handleSearch = () => {
      if (searchRef.current) {
        const term = searchRef.current.value;
        setSearchTerm(term);
      }
    };
  
  
  console.log("Enrollment List: ", enrollmentList);

  return (
    <Stack gap="30px">
      <QueryHeader
        label={label}
        useSelectState={[selectState, setSelectState]}
        selectData={["Newest", "Oldest", "World"]}
        handleSelectChange={handleSelectChange}
        handleSearch={handleSearch}
      />
      {isLoading ? (
        <Typography>Loading Enrollment...</Typography>
      ) : error ? (
        <Typography>Error: {error.message}</Typography>
      ) : enrollmentList.length > 0 ? (
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