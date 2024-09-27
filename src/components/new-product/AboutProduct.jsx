import { TextField, Box, Divider, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import IconWithTitle from "../course-product/IconWithTitle";
import TextSection from "../course-product/TextSection";
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
 * The component is given two props: `productName` and `description`.
 * `productName` is a string representing the product name.
 * `description` is a string representing the product description.
 *
 * The component returns a Box component with children.
 */
export default function AboutProduct({ register, errors }) {
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
        // error={errors}
        sx={{ my: 2 }}
        fullWidth
        id="outlined-controlled"
        label="Product Name"
        // onChange={(event) => setProductName(event.target.value)}
        {...register("name", { required: "Product name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Typography variant="bsr" color="dark.300" sx={{ mt: 2 }}>
        eg: Grow Lights - LED or fluorescent grow lights
      </Typography>

      <TextSection
        title="Tell us more about your product"
        description="Help explain what does the product do and key feature"
      />
      <TextField
        // error={error}
        multiline
        minRows={4}
        maxRows={10}
        slotProps={{
          input: { sx: { alignItems: "flex-start" } },
        }}
        sx={{ my: 2 }}
        fullWidth
        id="outlined-controlled"
        label="Description"
        // onChange={(event) => setdescription(event.target.value)}
        {...register("description", {
          required: "Product description is required",
        })}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
    </Box>
  );
}
