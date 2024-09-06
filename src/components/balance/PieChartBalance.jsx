import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

const data = [
  { value: 4, label: "Course" },
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

/**
 * A component that renders a PieChart with a single series,
 * displaying data on a summary of courses and products.
 *
 * @returns {JSX.Element} A JSX element representing a PieChart with a single series.
 */
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
