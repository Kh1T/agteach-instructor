import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Typography,
  Stack,
  Box,
} from "@mui/material";

import CategoryIcon from "@mui/icons-material/Category";
import React from "react";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import IconWithTitle from "../CourseProductComponents/IconWithTitle";
import TextSection from "../CourseProductComponents/TextSection";

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
