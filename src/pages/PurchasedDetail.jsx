import { ChevronLeft } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import CustomChip from "../components/CustomChip";
import CustomTable from "../components/CustomTable";
import CustomChip from "../components/CustomChip";

function PurchasedDetailPage() {
  const purchasedDetail = [
    {
      id: 1,
      productname: "Prunning Shears",
      category: "Tools",
      quantity: 2,
      price: 100,
      total: 200,
      orderdate: "2022-01-01",
    },
    {
      id: 2,
      productname: "Feterlizer Kit",
      category: "Feterlizers",
      quantity: 3,
      price: 50,
      total: 150,
      orderdate: "2022-01-02",
    },
  ];

  const purchasedList = purchasedDetail.map((item) => ({
    photos: (
      <Box
        src="https://img.freepik.com/free-photo/organic-cosmetic-product-with-dreamy-aesthetic-fresh-background_23-2151382816.jpg"
        component={"img"}
        width={70}
        height={70}
      />
    ),
    ...item,
  }));

  const navigate = useNavigate();
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
      <CustomTable data={purchasedList} />
    </Stack>
  );
}

export default PurchasedDetailPage;
