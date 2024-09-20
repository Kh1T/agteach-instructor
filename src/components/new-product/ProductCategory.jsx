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
import IconWithTitle from "../course-product/IconWithTitle";
import TextSection from "../course-product/TextSection";

import { useState, useEffect } from "react";
import { cateData } from "../../data/categoryDummy";

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
export default function ProductCategoryForm({ setCategory , error }) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories(cateData);
      }
    };

    fetchCategories();
  }, []);
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCategory(event.target.value); 
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
        <InputLabel id="category-select-label" error={error}>
          Category
        </InputLabel>
        <Select
          error={error}
          labelId="category-select-label"
          id="category-select"
          value={selectedCategory}
          label="Category"
          onChange={handleCategoryChange}
        >
          {/* Map over categories to create MenuItem for each */}
          {categories.map((category) => (
            <MenuItem key={category.category_id} value={category.category_id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider />
    </Stack>
  );
}
