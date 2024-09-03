import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

const data = [
  { value: 10, label: "Course" },
  { value: 10, label: "Product" },
];

const size = {
  width: 400,
  height: 250,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartBalance() {
  return (
    <PieChart
      series={[{ data, innerRadius: 80 }]}
      {...size}
    >
      <PieCenterLabel>Summary</PieCenterLabel>
    </PieChart>
  );
}
