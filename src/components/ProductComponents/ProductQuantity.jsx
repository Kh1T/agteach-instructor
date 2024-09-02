import React, { useState } from "react";
import { Box, Divider, Stack, TextField, Button } from "@mui/material";
import { Remove, Add } from "@mui/icons-material";

export default function ProductQuantity() {
  const [quantity, setQuantity] = useState(0); // Initialize quantity state

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  return (
    <Box className="container">
      <h2>Product Quantity</h2>
      <Divider />
      <h3>How many products are in stock?</h3>
      <p>Help explain what does the product do and key feature</p>
      <Stack direction={"row"} spacing={2}>
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
    </Box>
  );
}
