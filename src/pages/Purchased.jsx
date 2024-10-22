import React, { useRef, useState } from "react";
import { Stack, Typography, Box } from "@mui/material";
import QueryHeader from "../components/QueryHeader";
import CustomTable from "../components/CustomTable";
import CustomChip from "../components/CustomChip";
import { useGetPurchasedProductQuery } from "../services/api/productApi";
import emptyProduct from "../assets/Spooky Stickers Sweet Franky.png";
import { useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";

function PurchasedPage() {
  const navigate = useNavigate();
  const [selectState, setSelectState] = useState(0); // Sorting state
  const [searchTerm, setSearchTerm] = useState(""); // Search state

  const searchRef = useRef();

  // Mapping selectState to API values for the "order" query
  const order =
    selectState === 0 ? "All" : selectState === 10 ? "true" : "false";
  console.log("order", order);

  // Fetch data using both searchTerm and order for sorting
  const { data: purchased, isLoading } = useGetPurchasedProductQuery({
    name: searchTerm, // Send search term
    order, // Send sorting order
  });

  // Prepare the data to be displayed in the table
  let purchasedList = [];
  if (!isLoading && purchased) {
    const validPurchased = Array.isArray(purchased.data) ? purchased.data : [];
    purchasedList = validPurchased.map((item) => ({
      Date: item.purchased_date,
      Customer: item.last_name,
      Total: `$${item.total_sum}`,
      status:
        item.is_delivered === "true" || item.is_delivered === true ? (
          <CustomChip label="Delivered" />
        ) : (
          <CustomChip label="Not Delivered" danger />
        ),
      View: (
        <CustomButton
          sx={{ backgroundColor: "blue.main" }}
          variant="contained"
          onClick={() =>
            navigate(`/purchased/${item.purchased_id}/${item.customer_id}`, {
              state: { isDelivered: item.is_delivered },
            })
          }
        >
          <Typography variant="bsr">View</Typography>
        </CustomButton>
      ),
    }));
  }

  // Handle search functionality
  const handleSearch = () => {
    if (searchRef.current) {
      const term = searchRef.current.value;
      setSearchTerm(term);
    }
  };

  // Handle sorting selection
  const handleSelectChange = (event) => {
    setSelectState(event.target.value);
  };

  return (
    <Stack gap="30px">
      <QueryHeader
        label="Sort"
        useSelectState={[selectState, setSelectState]}
        selectData={["All", "Delivered", "Not Delivered"]}
        handleSelectChange={handleSelectChange}
        handleSearch={handleSearch}
        searchRef={searchRef}
        isCreateNew={false}
      />

      {isLoading ? (
        <Typography>Loading purchased...</Typography>
      ) : Array.isArray(purchasedList) && purchasedList.length > 0 ? (
        <CustomTable
          data={purchasedList}
          rowLimit={10}
          isPagination={true}
        />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height={"60vh"}
          sx={{ textAlign: "center" }}
        >
          <img
            src={emptyProduct}
            alt="emptyProduct"
            style={{ width: "200px", height: "200px", marginBottom: "10px" }}
          />
          <Typography variant="bmdr">No product found</Typography>
        </Box>
      )}
    </Stack>
  );
}

export default PurchasedPage;
