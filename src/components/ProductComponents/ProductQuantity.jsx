import React, { useState } from "react";
import {
  Box,
  Divider,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Remove, Add } from "@mui/icons-material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import IconWithTitle from "../CourseProductComponents/IconWithTitle";
import TextSection from "../CourseProductComponents/TextSection";

export default function ProductQuantity() {
  const [quantity, setQuantity] = useState(0); // Initialize quantity state

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  return (
    <Box className="container" mt={3}>
      <IconWithTitle
        title={"Product Quantity"}
        icon={<ProductionQuantityLimitsIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <TextSection
        title={"How many products are in stock?"}
        description={"Help the customer know the Specific amounts available"}
      />
      <Stack direction={"row"} spacing={2} my={4}>
        <TextField
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
        />
        <Button
          sx={{ color: "white", backgroundColor: "gray" }}
          onClick={handleDecrease}
        >
          <Remove />
        </Button>
        <Button
          sx={{ color: "white", backgroundColor: "black" }}
          onClick={handleIncrease}
        >
          <Add />
        </Button>
      </Stack>
      <Divider sx={{ my: 4 }} />
    </Box>
  );
}
