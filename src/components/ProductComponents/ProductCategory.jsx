import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Stack,
  Box,
} from "@mui/material";

import React from "react";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import IconWithTitle from "../CourseProductComponents/IconWithTitle";
import TextSection from "../CourseProductComponents/TextSection";

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
export default function ProductCategoryForm() {
  const [selectedCategory, setSelectedCategory] = React.useState(0);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

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
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={selectedCategory}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value={10}>Plant</MenuItem>
          <MenuItem value={20}>Fertilizer</MenuItem>
          <MenuItem value={30}>Tool</MenuItem>
        </Select>
      </FormControl>

      <Divider />
    </Stack>
  );
}
