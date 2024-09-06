import { TextField, Box, Divider, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import IconWithTitle from "../CourseProductComponents/IconWithTitle";
import TextSection from "../CourseProductComponents/TextSection";
import { useState } from "react";
/**
 * AboutProduct component renders a page for instructors to input product name and description.
 *
 * It renders the page with the following components:
 *   - IconWithTitle component with title and icon
 *   - Divider component
 *   - TextSection component with title and description
 *   - TextField component for inputting product name
 *   - Typography component with example
 *   - TextField component for inputting product description
 *
 * The component is given two props: `productName` and `productDescription`.
 * `productName` is a string representing the product name.
 * `productDescription` is a string representing the product description.
 *
 * The component returns a Box component with children.
 */
export default function AboutProduct() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");

  return (
    <Box className="container">
      <IconWithTitle
        title="About this Product"
        icon={<InfoIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2"></Typography>
      <TextSection
        title="What is your product name?"
        description="Your product name should be short and meaningful."
      />
      <TextField
        sx={{ my: 2 }}
        fullWidth
        id="outlined-controlled"
        label="Title"
        value={productName}
        onChange={(event) => setProductName(event.target.value)}
      />
      <Typography variant="bmdr" sx={{ mt: 2 }}>
        eg: Grow Lights - LED or fluorescent grow lights
      </Typography>

      <TextSection
        title="Tell us more about your product"
        description="Help explain what does the product do and key feature"
      />
      <TextField
        slotProps={{
          input: { sx: { alignItems: "flex-start", height: "156px" } },
        }}
        sx={{ my: 2 }}
        fullWidth
        id="outlined-controlled"
        label="Description"
        value={productDescription}
        onChange={(event) => setProductDescription(event.target.value)}
      />
    </Box>
  );
}
