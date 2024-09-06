import { useState } from "react";
import data from "../data/enrollmentData";
import CustomTable from "../components/CustomTable";
import QueryHeader from "../components/QueryHeader";

function EnromentPage() {
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
      />
      <CustomTable data={data} />
    </>
  );
}

export default EnromentPage;
