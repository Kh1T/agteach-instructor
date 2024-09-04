import {data} from "../data/sampleDashboardData";
import { Box } from "@mui/material";
import QueryHeader from "../components/QueryHeader";
import { useState } from "react";
import CustomTableMui from "../components/CustomTableMui";
import CustomTable from "../components/CustomTable";
import { purchased } from "../data/purchasedData";
function PurchasedPage() {
  const [selectState, setSelectState] = useState(0);
  const label = "Filter";
  function handleCreateNew() {}
  function handleSearch() {}
  const purcahaseList  =purchased.map((item)=> {    
    
    if(item.status){
      item.status = "Delivered"
    } else{ item.status = "a" 
      console.log('object');
    }

    // item.status =  ?  "Deliverasdfed" : "Not Yet Delivered"
    return item
  })
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
      <CustomTable data={purcahaseList} rowLimit={10} isPagination={true} />
    </Box>
  );
}

export default PurchasedPage;
