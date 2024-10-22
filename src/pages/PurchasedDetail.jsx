import React, { useState, useMemo } from "react";
import { ChevronLeft } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom"; // Import useLocation
import CustomTable from "../components/CustomTable";
import CustomChip from "../components/CustomChip";
import {
  useGetPurchasedProductQuery,
  useGetPurchasedDetailsQuery,
  useUpdatePurchasedDetailsMutation,
} from "../services/api/productApi";
import CustomButton from "../components/CustomButton";
import profileImg from "../assets/Monsters Standing.png";

function PurchasedDetailPage() {
  const navigate = useNavigate();
  const { purchasedId, customerId } = useParams();
  
  const location = useLocation(); // Get the state passed from the previous page
  const { isDelivered: initialIsDelivered } = location.state || {}; // Destructure and provide a fallback

  const { data: purchasedDetails, isLoading: isLoadingDetails } =
    useGetPurchasedDetailsQuery({ purchasedId, customerId });
  
  const [updatePurchasedDetails] = useUpdatePurchasedDetailsMutation();

  // Track delivery status, initializing it from the passed state or fallback to false
  const [isDelivered, setIsDelivered] = useState(initialIsDelivered ?? false);

  // Combine customer data with purchasedDetails
  const combinedPurchasedDetails = useMemo(() => {
    if (purchasedDetails?.purchasedDetails && purchasedDetails?.customer) {
      return purchasedDetails.purchasedDetails.map((item) => ({
        ...item,
        customer: purchasedDetails.customer,
      }));
    }
    return [];
  }, [purchasedDetails]);

  const tableData = combinedPurchasedDetails.map((item) => ({
    Photo: (
      <img
        src={item.product?.imageUrl || profileImg}
        alt="Product Image"
        width="80"
        height="80"
        style={{ borderRadius: "5px" }}
      />
    ),
    category: item.product?.categoryId || "N/A",
    Quantity: item.quantity || 0,
    price: `$ ${item.price || 0}`,
    Total: `$ ${item.total || 0}`,
    OrderDate: item.createdAt
      ? new Date(item.createdAt).toISOString().split("T")[0]
      : "N/A",
  }));

  const customer = purchasedDetails?.customer || {};

  const handleDelivery = async () => {
    try {
      await updatePurchasedDetails({ purchasedId });
      setIsDelivered(true); // Update local state to "delivered"
    } catch (error) {
      console.error("Failed to update delivery status", error);
    }
  };

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

      <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={3}>
          <Box
            src={customer.imageUrl || profileImg}
            component="img"
            width={130}
            height={130}
            alt="Customer Image"
            sx={{ borderRadius: "5px" }}
          />
          <Stack gap>
            <Typography variant="bxsr">Customer Name</Typography>
            <Typography variant="blgr">{`${customer.firstName || ''} ${customer.lastName || ''}`}</Typography>
            <Typography variant="bxsr">
              <Box component="strong">Email: </Box>
              {customer.email || 'N/A'}
            </Typography>
            <Typography variant="bxsr">
              <Box component="strong">Phone: </Box>
              {customer.phone || 'N/A'}
            </Typography>
            <Typography variant="bxsr">
              <Box component="strong">Address: </Box>
              {customer.address || 'N/A'}
            </Typography>
          </Stack>
        </Stack>

        <CustomChip
          label={isDelivered ? "Delivered" : "Not Yet Delivered"}
          danger={!isDelivered}
          success={isDelivered}
          sx={{ py: "15px" }}
        />
      </Stack>

      <Divider />
      <Typography variant="h3">Purchased Detail</Typography>

      {isLoadingDetails ? (
        <Typography>Loading purchased details...</Typography>
      ) : (
        <>
          <CustomTable data={tableData} />
          {!isDelivered && (
            <CustomButton
              sx={{ backgroundColor: "blue.main" }}
              variant="contained"
              onClick={handleDelivery}
            >
              {isLoadingDetails ? "Delivering..." : "Delivered"}
            </CustomButton>
          )}
        </>
      )}
    </Stack>
  );
}

export default PurchasedDetailPage;
