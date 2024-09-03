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
      <Typography variant="h3">Product Quantity</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" fontWeight={"bold"}>
        How many products are in stock?
      </Typography>
      <Typography variant="subtitle2">
        Help explain what does the product do and key feature
      </Typography>
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
