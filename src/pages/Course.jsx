import { useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import QueryHeader from "../components/QueryHeader";
import { courses } from "../data/coursesData";
import CustomTable from "../components/CustomTable";

function CoursePage() {
  const [selectState, setSelectState] = useState(0);

  const searchRef = useRef();
  const label = "Sort";
  const courseList = courses.map((item) => ({
    ...item,
    edit: (
      <EditIcon
        sx={{ cursor: "pointer" }}
        onClick={() => console.log(item.name)}
      />
    ),
    delete: (
      <DeleteIcon
        color="red"
        sx={{ cursor: "pointer" }}
        onClick={() => console.log(item.name)}
      />
    ),
  }));

  function handleSearch() {}
  return (
    <>
      <QueryHeader
        label={label}
        searchRef={searchRef}
        useSelectState={[selectState, setSelectState]}
        selectData={["Newest", "Oldest"]}
        handleSearch={handleSearch}
        pathCreated="/course/new"
        labelCreate="Create Course"
      />
      <CustomTable data={courseList} rowLimit={10} isPagination={true} />
    </>
  );
}

export default CoursePage;
