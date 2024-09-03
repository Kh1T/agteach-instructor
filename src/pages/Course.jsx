import { useState } from "react";
import QueryHeader from "../components/QueryHeader";
import CustomTableMui from "../components/CustomTableMui";
import { data } from "../data/sampleDashboardData";

function CoursePage() {
  const [selectState, setSelectState] = useState();
  const label = "Sort";
  function handleCreateNew() {}
  function handleSearch() {}
  return (
    <>
      <QueryHeader
        label={label}
        useSelectState={[selectState, setSelectState]}
        selectData={["Newest", "Oldest", "World"]}
        handleCreateNew={handleCreateNew}
        handleSearch={handleSearch}
        labelCreate="Create Course"
      />
      <CustomTableMui data={data}/>
    </>
  );
}

export default CoursePage;
