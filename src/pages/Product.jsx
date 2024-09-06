import { Stack } from "@mui/material";
import { useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { products } from "../data/productsDummy";
import CustomTable from "../components/CustomTable";
import QueryHeader from "../components/QueryHeader";
function ProductPage() {
  const [selectState, setSelectState] = useState(0);

  const searchRef = useRef();
  const label = "Sort";
  const productList = products.map((item) => ({
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
    <Stack gap="30px" sx={{ width: "100%" }}>
      <QueryHeader
        label={label}
        searchRef={searchRef}
        useSelectState={[selectState, setSelectState]}
        isCreateNew={true}
        selectData={["Newest", "Oldest"]}
        handleSearch={handleSearch}
        pathCreated="/product/new"
        labelCreate="Create Product"
      />
      <CustomTable data={productList} rowLimit={10} isPagination={true} />
    </Stack>
  );
}

export default ProductPage;
