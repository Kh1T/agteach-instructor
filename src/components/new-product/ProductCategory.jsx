import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Stack,
  Box,
  FormHelperText,
  CircularProgress,
} from "@mui/material";

import React from "react";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import IconWithTitle from "../course-product/IconWithTitle";
import TextSection from "../course-product/TextSection";
// import { cateData } from "../../data/categoryDummy";

/**
 * ProductCategoryForm component renders a form to select the category of a product.
 *
 * It consists of an IconWithTitle component with a BurstModeIcon,
 * a Divider component,
 * a TextSection component with title "Product Category" and description "Please choose an appropriate category for this product",
 * a FormControl component with a Select component with the categories.
 *
 * The categories are:
 *   - Plant
 *   - Fertilizer
 *   - Tool
 *
 * The value of the selected category is stored in the state variable `selectedCategory`.
 *
 * When the category is changed, the `handleCategoryChange` function is called with the new value as argument.
 */
import { useGetAllCategoriesQuery } from "../../services/api/categoryApi";
export default function ProductCategoryForm({
  register,
  errors,
  defaultValue,
}) {
  const { data, isLoading } = useGetAllCategoriesQuery();
  if (isLoading) {
    return (
      <Stack fullWidth alignContent="center">
        <CircularProgress size={24} />
      </Stack>
    );
  }
  const cateData = data.data || [];
  return (
    <Stack className="container" gap={1} alignItems="flex-start">
      <Box sx={{ width: "100%" }}>
        <IconWithTitle
          title={"Category"}
          icon={<BurstModeIcon sx={{ color: "common.white" }} />}
        />

        <Divider variant="fullWidth" sx={{ my: 2 }} />
        <TextSection
          title={"Product Category"}
          description={"Please choose an appropriate category for this product"}
        />
      </Box>

      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel error={!!errors.categoryId}>Category</InputLabel>
        <Select
          label="Category"
          defaultValue={defaultValue}
          {...register("categoryId", {
            required: "Category is required",
          })}
          error={!!errors.categoryId}
        >
          {cateData.map((option) => (
            <MenuItem key={option.categoryId} value={option.categoryId}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!errors.categoryId}>
          {errors.categoryId?.message}
        </FormHelperText>
      </FormControl>
      <Divider />
    </Stack>
  );
}
