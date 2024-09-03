import { useRef, useState } from "react";
import QueryHeader from "../components/QueryHeader";
import CustomTableMui from "../components/CustomTableMui";
import { data } from "../data/sampleDashboardData";

function CoursePage() {
  const [selectState, setSelectState] = useState(0);
  
  const searchRef = useRef();
  const label = "Sort";
  function handleSearch() {
    console.log(searchRef.current.value);
    console.log(selectState);
  }
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
      <CustomTableMui data={data}/>
    </>
  );
}

export default CoursePage;
