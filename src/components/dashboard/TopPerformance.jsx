import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CustomTableHeader from "../CustomTableHeader";
import { useState } from "react";
import CustomTable from "../CustomTable";
import {
  useGetCourseTopSalesQuery,
  useGetProductTopSalesQuery,
} from "../../services/salesApi";

/**
 * TopPerformance component renders a table of top 5 performing products or courses, with a select dropdown to filter by course or product.
 *
 * @returns {JSX.Element} A JSX element representing the TopPerformance component
 */
export default function TopPerformance() {
  const [transaction, setTransaction] = useState(10);
  const { data: courseData, isLoading: isLoadingCourses } =
    useGetCourseTopSalesQuery();
  const { data: productData, isLoading: isLoadingProducts } =
    useGetProductTopSalesQuery();

  const productSalesData =
    !isLoadingProducts && productData?.data
      ? productData.data.map((item, index) => ({
          No: index + 1,
          "Product ID": item.product_id,
          "Product Name": item.name,
          Category: item.category,
          Earning: `${item.totalSales}$`,
        }))
      : [];

  const courseSalesData =
    !isLoadingCourses && courseData?.data
      ? courseData.data.map((item, index) => ({
          No: index + 1,
          "Course ID": item.course_id,
          "Course Name": item.name,
          Category: "Course",
          Earning: `${item.totalSales}$`,
        }))
      : [];

  const noData =
    (courseSalesData.length === 0 && transaction === 10) ||
    (productSalesData.length === 0 && transaction === 20);

  return (
    <Box
      sx={{
        p: 4,
        boxShadow: "0px 10px 33px 0px rgba(5,27,58,0.1)",
        borderRadius: 4,
      }}
    >
      {isLoadingCourses || isLoadingProducts ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "25vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <CustomTableHeader
              title="Top 5 Performance"
              content="In this month"
            />
            <Box sx={{ minWidth: 180 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select">Transaction</InputLabel>
                <Select
                  id="demo-simple-select"
                  value={transaction}
                  onChange={(e) => setTransaction(e.target.value)}
                  label="Transaction"
                  defaultValue="10"
                >
                  <MenuItem value={10}>Course</MenuItem>
                  <MenuItem value={20}>Product</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
          {noData ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "20vh",
              }}
            >
              <Typography variant="bsr">
                No {transaction === 10 ? "Course" : "Product"} Found in Top 5
                Performance
              </Typography>
            </Box>
          ) : (
            <CustomTable
              data={transaction === 10 ? courseSalesData : productSalesData}
            />
          )}
        </Stack>
      )}
    </Box>
  );
}
