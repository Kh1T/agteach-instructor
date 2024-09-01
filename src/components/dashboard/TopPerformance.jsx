import { Box, Stack } from "@mui/material";
import CustomTableHeader from "../CustomTableHeader";
import CustomTableMui from "../CustomTableMui";

function TopPerformance() {
  function createData(...rest) {
    return { ...rest };
  }
  const headers = ["No", "Product", "Category", "Earning"];
  const rows = [
    createData(1, "Advanced Vegetable Farming", "Course", "$150"),
    createData(2, "Advanced Vegetable Farming", "Course", "$150"),
    createData(3, "Advanced Vegetable Farming", "Course", "$150"),
    createData(4, "Advanced Vegetable Farming", "Course", "$150"),
    createData(5, "Advanced Vegetable Farming", "Course", "$150"),
  ]
  const data = {headers, rows}
  return (
    <Box sx={{
      boxShadow: 2,
      p:4
    }}>
      <Stack spacing={2}>
      <CustomTableHeader title="Top(5) Performance" content="In this month"/>
      <CustomTableMui data={data} />
      </Stack>
    </Box>
  );
}

export default TopPerformance;
