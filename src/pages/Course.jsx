import { Stack, Typography, Box } from "@mui/material";
import { useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import QueryHeader from "../components/QueryHeader";
import CustomTable from "../components/CustomTable";
import {
  useConfirmDeleteMutation,
  useGetAllCoursesQuery,
} from "../services/api/courseApi";
import { useNavigate } from "react-router";
import emptyProduct from "../assets/spooky-stickers-sweet-franky.png";
import { useDispatch } from "react-redux";
import { setId } from "../features/course/courseSlice";
import { CustomAlert } from "../components/CustomAlert";
import DeleteConfirmModal from "../components/course-product/DeleteConfirmModal";

/**
 * CoursePage renders a page for viewing and managing courses.
 *
 * It renders a QueryHeader component at the top for searching and filtering courses.
 * Below the QueryHeader, it renders a list of courses in a table format using the CustomTable component.
 * Each row in the table contains the course name, price, edit and delete icons.
 * The edit icon navigates to the course edit page when clicked.
 * The delete icon opens a confirmation dialog when clicked.
 * If the user confirms the deletion, the course is deleted and the table is updated.
 * If the user cancels the deletion, the confirmation dialog is closed.
 *
 * The component also renders a confirmation dialog when the delete icon is clicked.
 * The dialog shows a message asking the user to confirm the deletion of the course.
 * If the user confirms the deletion, the course is deleted and the dialog is closed.
 * If the user cancels the deletion, the dialog is closed.
 *
 * @returns a JSX element containing the CoursePage component.
 */
function CoursePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectState, setSelectState] = useState(0);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const {
    data: course,
    isLoading,
    refetch,
  } = useGetAllCoursesQuery({ name: searchTerm, order: selectState });
  const [confirmDelete] = useConfirmDeleteMutation();
  const searchRef = useRef();
  const label = "Sort";
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    msg: "",
    severity: "",
  });
  const dispatch = useDispatch();

  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedCourse) {
      try {
        await confirmDelete(selectedCourse.courseId).unwrap();
        setSnackbar({
          open: true,
          msg: "Course deleted successfully",
          severity: "success",
        });
        refetch();
      } catch (error) {
        console.error("Failed to delete the course: ", error);
        setSnackbar({
          open: true,
          msg: "Failed to delete the course",
          severity: "error",
        });
      }
    }
    handleCloseDialog();
  };

  const handleEditClick = (course) => {
    dispatch(setId(course?.courseId));
    navigate(`/course/${course?.courseId}`);
  };

  const courseList = isLoading
    ? []
    : course?.item?.map((item) => ({
        Date: new Date(item.createdAt).toISOString().split("T")[0],
        "Course Name": item.name,
        Price: `$${item.price}`,
        edit: (
          <EditIcon
            sx={{ cursor: "pointer" }}
            onClick={() => handleEditClick(item)}
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
      {isLoading || isLoadingSearch ? (
        <Typography>Loading courses...</Typography>
      ) : courseList.length === 0 ? (
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

      <DeleteConfirmModal
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        type="course"
      />
      <CustomAlert
        label={snackbar?.msg}
        open={snackbar?.open}
        severity={snackbar?.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Stack>
  );
}

export default CoursePage;
