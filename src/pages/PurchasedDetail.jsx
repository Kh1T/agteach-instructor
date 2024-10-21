import { ChevronLeft } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"; // useParams for getting dynamic route params
import CustomTable from "../components/CustomTable";
import CustomChip from "../components/CustomChip";
import {
  useGetPurchasedProductQuery,
  useGetPurchasedDetailsQuery,
} from "../services/api/productApi"; // Import the new hook

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
  console.log("Purchased Details:", purchasedDetails); // Check the details data

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
        {/* Display instructor details, this part can be updated with actual data from purchasedDetails */}
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
      ) : Array.isArray(purchasedDetails) && purchasedDetails.length > 0 ? (
        <CustomTable data={purchasedDetails} />
      ) : (
        <Typography>No purchased details found.</Typography>
      )}
    </Stack>
  );
}

export default PurchasedDetailPage;
