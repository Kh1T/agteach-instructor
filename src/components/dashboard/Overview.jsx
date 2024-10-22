import { Box,  Typography } from "@mui/material";
import SimpleBarChart from "./SimpleBarChart";
import { useGetSalesOverviewQuery } from "../../services/salesApi";

function Overview() {
  const {data} = useGetSalesOverviewQuery()
  const saleData = (data?.data ?? []).reduce(
    (acc, { day, totalcoursesales, totalproductsales }) => {
      const date = new Date(day);
      const formattedDate = [
        String(date.getDate()).padStart(2, "0"),
        String(date.getMonth() + 1).padStart(2, "0"), // Months are zero-indexed
        date.getFullYear(),
      ].join("-");

      acc.days.push(formattedDate);
      acc.totalCourseSales.push(totalcoursesales);
      acc.totalProductSales.push(totalproductsales);

      return acc;
    },
    { days: [], totalCourseSales: [], totalProductSales: [] }
  );

  return (
      <Box
        sx={{
          width: "100%",
          height: 440,
          boxShadow: "0px 10px 33px 0px rgba(5,27,58,0.1)",
          borderRadius: 4,
        }}
      >
        <Box sx={{ px: "25px", pt: "35px" }}>
          <Typography variant="blgsm">Overview</Typography>
          <SimpleBarChart data={saleData} />
        </Box>
      </Box>
  );
}

export default Overview;
