import { useState } from "react";
import QueryHeader from "../components/QueryHeader";

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
        selectData={["Newest", "Oldest"]}
        handleCreateNew={handleCreateNew}
        handleSearch={handleSearch}
      />
    </>
  );
}

export default CoursePage;
