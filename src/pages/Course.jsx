import { useState } from "react";
import QueryHeader from "../components/QueryHeader";
import ChipDelivery from "../components/ChipDelivery";
import CustomTableMui from "../components/CustomTableMui";
import {data} from '../data/sampleDashboardData';
function CoursePage() {
  const [selectState, setSelectState] = useState();
  const label = "Sort";
  function handleCreateNew() {}
  function handleSearch() {}
  let {headers, rows} = data
  rows[0][0] = <ChipDelivery isDelivered={true}/>
  return (
    <>
      <QueryHeader
        label={label}
        useSelectState={[selectState, setSelectState]}
        selectData={["Newest", "Oldest", "World"]}
        handleCreateNew={handleCreateNew}
        handleSearch={handleSearch}
      />
      <ChipDelivery isDelivered={true} />
      <ChipDelivery isDelivered={false} />
      <CustomTableMui data={{headers, rows}} />
    </>
  );
}

export default CoursePage;
