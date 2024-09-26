import React, { useState } from "react";
import { Box, Divider, Stack, TextField, Button } from "@mui/material";
import { Remove, Add } from "@mui/icons-material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import IconWithTitle from "../course-product/IconWithTitle";
import TextSection from "../course-product/TextSection";
import { set } from "react-hook-form";
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
export default function ProductQuantity({ register, errors, watch, setValue }) {
  const quantity = watch("quantity", 0);

  const handleIncrease = () => {
    setValue("quantity", parseInt(quantity) + 1);
  };

  const handleDecrease = () => {
    setValue("quantity", Math.max(0, parseInt(quantity) - 1));
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
          {...register("quantity", {
            required: "Quantity is required",
            min: {
              value: 0,
              message: "Quantity must be greater than or equal to 0",
            },
          })}
          error={!!errors.quantity}
          helperText={errors.quantity?.message}
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
