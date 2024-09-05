import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Button,
  Typography,
  Stack,
  Box,
} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CategoryIcon from "@mui/icons-material/Category";
import React from "react";
import { iconContainerStyle } from "../../theme/IconBg";

export default function ProductCategoryForm() {
  const [selectedCategory, setSelectedCategory] = React.useState(0);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Stack className="container" gap={1} alignItems="flex-start">
      <Button
        variant="text"
        color="black"
        startIcon={<ArrowBackIosIcon fontSize="small" color="gray" />}
        sx={{ gap: 0, paddingLeft: 0 }}
      >
        Go Back
      </Button>
      

      <Box sx={{ width: "100%" }}>
        <Stack direction="row" gap={1} alignItems="center">
          <Box sx={iconContainerStyle}>
            <CategoryIcon sx={{ color: "common.white" }} />
          </Box>
          <Typography variant="h3">Category</Typography>
        </Stack>

        <Divider variant="fullWidth" sx={{ my: 2 }} />

        <Typography variant="h6" fontWeight="bold" marginY={1}>
          Product Category
        </Typography>

        <Typography variant="subtitle2">
          Please choose an appropriate category for this product
        </Typography>
      </Box>

      <FormControl fullWidth sx={{ my: 4 }}>
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
