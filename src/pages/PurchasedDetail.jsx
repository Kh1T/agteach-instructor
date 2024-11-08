import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import CustomTable from "../components/CustomTable";
import CustomChip from "../components/CustomChip";
import {
  useGetPurchasedDetailsQuery,
  useUpdatePurchasedDetailsMutation,
} from "../services/api/productApi";
import CustomButton from "../components/CustomButton";
import profileImg from "../assets/monsters-standing.png";
import { CustomAlert } from "../components/CustomAlert";
import InfoIcon from "@mui/icons-material/Info";

function PurchasedDetailPage() {
  const navigate = useNavigate();
  const { purchasedId, customerId } = useParams();
  const { data: purchasedDetails, isLoading: isLoadingDetails } =
    useGetPurchasedDetailsQuery({ purchasedId, customerId });

  const [updatePurchasedDetails] = useUpdatePurchasedDetailsMutation();

  // State to track the delivery status, initialized to `null`
  const [isDelivered, setIsDelivered] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Update `isDelivered` state once `purchasedDetails` is loaded
  useEffect(() => {
    if (purchasedDetails && purchasedDetails.isDelivered !== undefined) {
      console.log(purchasedDetails.isDelivered);
      setIsDelivered(purchasedDetails.isDelivered);
    }
  }, [purchasedDetails]);

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
    "Product Name": item.product?.name || "N/A",
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
      const customerEmail = customer.email;
      if (!customerEmail) {
        console.error("Email is missing");
        return;
      }

      await updatePurchasedDetails({ purchasedId, customerEmail });
      setIsDelivered(true); // Update local state to "delivered"
      setIsAlertOpen(true); // Show success alert
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

      <Stack
        direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
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
            <Typography variant="blgr">{`${customer.firstName || ""} ${customer.lastName || ""}`}</Typography>
            <Typography variant="bxsr">
              <Box component="strong">Email: </Box>
              {customer.email || "N/A"}
            </Typography>
            <Typography variant="bxsr">
              <Box component="strong">Phone: </Box>
              {customer.phone || "N/A"}
            </Typography>
            <Typography variant="bxsr">
              <Box component="strong">Address: </Box>
              {customer.address || "N/A"}
            </Typography>
          </Stack>
        </Stack>

        <CustomChip
          label={
            isDelivered === null
              ? "Loading..."
              : isDelivered
                ? "Delivered"
                : "Not Yet Delivered"
          }
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
        <CustomTable data={tableData} />
      )}
      <Stack gap={2}>
        {!isDelivered && (
          <Stack>
            <Box
              variant="bxsr"
              sx={{
                color: "dark.200",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mb: 2,
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <InfoIcon fontSize="small" />
                <Typography variant="bxsr">
                  Clicking the <strong>'Delivered'</strong> button will update
                  the status to 'Delivered,' indicating that the customer's
                  order is on its way.
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <InfoIcon fontSize="small" />
                <Typography variant="bxsr">
                  An email will be sent to the customer whenever the product
                  status is updated.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <CustomButton
                sx={{
                  backgroundColor: "blue.main",
                  mt: 0,
                }}
                variant="contained"
                onClick={handleDelivery}
              >
                Delivered
              </CustomButton>
            </Box>
          </Stack>
        )}
        <CustomAlert
          severity="success"
          open={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          duration={100}
          label="The product has been delivered."
        />
      </Stack>
    </Stack>
  );
}

export default PurchasedDetailPage;
