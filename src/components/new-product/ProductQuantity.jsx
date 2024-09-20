import React, { useState } from "react";
import { Box, Divider, Stack, TextField, Button } from "@mui/material";
import { Remove, Add } from "@mui/icons-material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import IconWithTitle from "../course-product/IconWithTitle";
import TextSection from "../course-product/TextSection";
import { set } from "react-hook-form";

/**
 * ProductQuantity component renders a page for instructors to input the quantity of a product.
 *
 * It renders the page with the following components:
 *   - IconWithTitle component with title and icon
 *   - Divider component
 *   - TextSection component with title and description
 *   - TextField component for inputting quantity
 *   - Two Button components for increasing and decreasing the quantity
 *
 * @returns {JSX.Element} Box component with children
 */
export default function ProductQuantity({ setProductQuantity }) {
  const [quantity, setQuantity] = useState(0); // Initialize quantity state

  const handleIncrease = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setProductQuantity(newQuantity);
      return newQuantity;
    });
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity > 0 ? prevQuantity - 1 : 0;
      setProductQuantity(newQuantity);
      return newQuantity;
    });
  };

  const handleOnChange = (e) => {
    setQuantity(e.target.value);
    setProductQuantity(e.target.value);
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
        <TextField type="number" value={quantity} onChange={handleOnChange} />
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
