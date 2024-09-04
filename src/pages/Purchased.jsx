import { Box } from "@mui/material";
import QueryHeader from "../components/QueryHeader";
import { useState } from "react";
import CustomTable from "../components/CustomTable";
import { purchased } from "../data/purchasedData";
import { CustomChip } from "../components/CustomChip";
function PurchasedPage() {
  const [selectState, setSelectState] = useState(0);
  const label = "Filter";
  function handleCreateNew() {}
  function handleSearch() {}
  const purchasedList = purchased.map(item => {
    // Create a deep copy of the item object
    const newItem = { ...item }; // Shallow copy of the object
  
    // Modify the status in the copied object
    newItem.status = item.status
      ? <CustomChip label="Delivered" />
      : <CustomChip label="Not Delivered" danger/>;
    return newItem;
  });
  return (
    <Box>
      <QueryHeader
        label={label}
        useSelectState={[selectState, setSelectState]}
        selectData={["All", "Delivered", "Not Delivered"]}
        handleCreateNew={handleCreateNew}
        handleSearch={handleSearch}
        isCreateNew={false}
      />
      <CustomTable data={purchasedList} rowLimit={10} isPagination={true} />
    </Box>
  );
}

export default PurchasedPage;
