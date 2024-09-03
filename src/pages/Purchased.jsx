import {data} from "../data/sampleDashboardData";
import { Box } from "@mui/material";
import QueryHeader from "../components/QueryHeader";
import { useState } from "react";
import CustomTableMui from "../components/CustomTableMui";
function PurchasedPage() {
  const [selectState, setSelectState] = useState(0);
  const label = "Filter";
  function handleCreateNew() {}
  function handleSearch() {}

  return (
    <Box>
      <QueryHeader
        label={label}
        useSelectState={[selectState, setSelectState]}
        selectData={["All", "Delivered", "Not Delivered"]}
        handleCreateNew={handleCreateNew}
        handleSearch={handleSearch}
        isCreateNew = {false}
      />
      <CustomTableMui data={data} />
    </Box>
  );
}

export default PurchasedPage;
