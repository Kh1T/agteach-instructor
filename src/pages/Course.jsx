import {
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import QueryHeader from "../components/QueryHeader";
import CustomTable from "../components/CustomTable";
import {
  useConfirmDeleteMutation,
  useSearchCoursesQuery,
} from "../services/api/courseApi";
import { useNavigate } from "react-router";
import deletBin from "../assets/Go Green Grey Hanger Bag.png";
import emptyProduct from "../assets/Spooky Stickers Sweet Franky.png";

function CoursePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectState, setSelectState] = useState(0);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false); // New loading state
  const {
    data: searchedCourse,
    isFetching: isSearching,
    refetch,
  } = useSearchCoursesQuery({ name: searchTerm, order: selectState });
  const [confirmDelete] = useConfirmDeleteMutation();
  const searchRef = useRef();
  const label = "Sort";
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  console.log(searchedCourse);
  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedCourse?.courseId) {
      console.log("Deleting course with ID:", selectedCourse.courseId);
      try {
        await confirmDelete(selectedCourse.courseId).unwrap();
        console.log("Course deleted successfully");
        refetch();
      } catch (error) {
        console.error("Failed to delete the course: ", error);
      }
    }
    handleCloseDialog();
  };

  const courseList = isSearching
    ? []
    : searchedCourse?.data?.map((item) => ({
        Date: new Date(item.createdAt).toISOString().split("T")[0],
        // Course: item.courseId,
        Name: item.name,
        Price: item.price,
        edit: (
          <EditIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/course/new", {
                state: {
                  course: item, // Pass the entire course object
                },
              });
            }}
          />
        ),
        delete: (
          <DeleteIcon
            color="red"
            sx={{ cursor: "pointer" }}
            onClick={() => handleDeleteClick(item)}
          />
        ),
      })) || [];

  // console.log(courseList, "courseList");

  const handleSearch = () => {
    setIsLoadingSearch(true); // Set loading state to true
    const term = searchRef.current.value;
    setSearchTerm(term); // Update the search term state
    setIsLoadingSearch(false); // Reset loading state after setting the search term
  };



  return (
    <Stack gap="30px">
      <QueryHeader
        label={label}
        searchRef={searchRef}
        useSelectState={[selectState, setSelectState]}
        selectData={["Newest", "Oldest"]}
        isCreateNew={true}
        handleSearch={handleSearch}
        pathCreated="/course/new"
        labelCreate="Create Course"
      />
      {isSearching || isLoadingSearch ? (
        <Typography>Loading courses...</Typography>
      ) : courseList && courseList.length === 0 ? (
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
          <Typography variant="bmdr">No courses found</Typography>
        </Box>
      ) : (
        <CustomTable data={courseList} rowLimit={10} isPagination={true} />
      )}

      {/* data={[{'test' : 'test'}]} */}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ textAlign: "center" }}
          >
            <img
              src={deletBin}
              alt="Confirmation"
              style={{ width: "136px", height: "136px", marginBottom: "10px" }}
            />
            <Typography variant="blgsm" padding={"10px"}>
              Delete Confirmation
            </Typography>
            <Typography variant="bxsr">
              Are you sure you want to delete this course? <br /> You won't be
              able to retrieve it back.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: "16px" }}>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{ bgcolor: "red.main", marginRight: 1 }}
          >
            Delete
          </Button>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default CoursePage;
