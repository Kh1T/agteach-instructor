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
    <>
      <h2>Top(5) Performance </h2>
      <CustomTableMui data={data} />
    </>
  );
}

export default TopPerformance;
