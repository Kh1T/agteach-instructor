import { ChevronLeft } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CustomTable from "../components/CustomTable";
import CustomChip from "../components/CustomChip";
import {
  useGetPurchasedProductQuery,
  useGetPurchasedDetailsQuery,
} from "../services/api/productApi";
import CustomButton from "../components/CustomButton";

function PurchasedDetailPage() {
  const navigate = useNavigate();
  const { purchasedId, customerId } = useParams();

  const { data: purchased, isLoading: isLoadingPurchased } =
    useGetPurchasedProductQuery();
  const { data: purchasedDetails, isLoading: isLoadingDetails } =
    useGetPurchasedDetailsQuery({ purchasedId, customerId });

  let purchasedList = [];
  if (!isLoadingPurchased && purchased) {
    const validPurchased = Array.isArray(purchased.data) ? purchased.data : [];
    purchasedList = validPurchased.map((item) => ({
      ...item,
    }));
  }

  console.log("Purchased:", purchased);

  const purchasedItems =
    purchasedDetails?.purchasedDetails &&
    Array.isArray(purchasedDetails.purchasedDetails)
      ? purchasedDetails.purchasedDetails
      : [];
  console.log("Purchased Details:", purchasedDetails);

  // Transform purchasedItems into the format expected by CustomTable
  const tableData = purchasedItems.map((item) => ({
    Photo: (
      <img
        src={item.product.imageUrl}
        alt="Product Image"
        width="80"
        height="80"
        style={{ borderRadius: "5px" }}
      />
    ),
    category: item.product.categoryId,
    Quantity: item.quantity,
    price: `$ ${item.price}`,
    Total: `$ ${item.total}`,
    OrderDate: new Date(item.createdAt).toISOString().split("T")[0],
  }));

  return (
    <Stack alignItems="start" gap={5}>
      <Button
        variant="Text"
        sx={{ color: "dark.300" }}
        startIcon={<ChevronLeft />}
        onClick={() => navigate(-1)}
      >
        <Typography variant="bsr" sx={{ textDecoration: "underline" }}>
          Go Back
        </Typography>
      </Button>
      <Stack
        direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" gap={3}>
          <Box
            src="https://images.blush.design/jJhw-B2TJJTgTuFYENbT?w=920&auto=compress&cs=srgb"
            component="img"
            width={130}
            height={130}
          />
          <Stack gap>
            <Typography variant="bxsr">Instructor Name</Typography>
            <Typography variant="blgr">Srey Roth</Typography>
            <Typography variant="bxsr">
              <Box component="strong">Email: </Box>roth@abc.xyz
            </Typography>
            <Typography variant="bxsr">
              <Box component="strong">Phone: </Box>0123456789
            </Typography>
            <Typography variant="bxsr">
              <Box component="strong">Address: </Box>St.6, plov veng sreng
            </Typography>
          </Stack>
        </Stack>
        <CustomChip label="Not Yet Delivered" danger sx={{ py: "15px" }} />
      </Stack>
      <Divider />
      <Typography variant="h3">Purchased Detail</Typography>

      {isLoadingDetails ? (
        <Typography>Loading purchased details...</Typography>
      ) : tableData.length > 0 ? (
        <>
          <CustomTable data={tableData} />
          <CustomButton
          sx={{ backgroundColor: "blue.main" }}
          variant="contained"
            // onClick={handleButtonClick}
          >
            Delivered
          </CustomButton>
        </>
      ) : (
        <Typography>No purchased details found.</Typography>
      )}
    </Stack>
  );
}

export default PurchasedDetailPage;
