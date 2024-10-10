import {
  TextField,
  Box,
  Divider,
  Typography,
} from "@mui/material";
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
import { useEffect, useState } from "react";
export default function AboutProduct({
  register,
  errors,
  name='',
  description='',
  setValue,
}) {
  const [nameCharCount, setNameCharCount] = useState(0);
  const [descCharCount, setDescCharCount] = useState(0);

  useEffect(() => {
    setNameCharCount(name.length);
    setDescCharCount(description.length);
  }, [name, description]);

  const maxNameLength = 50;
  const maxDescLength = 1000;

  const handleNameCharCount = (event) => {
    setValue("name", event.target.value);
    setNameCharCount(event.target.value.length);
  };

  const handleDescCharCount = (event) => {
    setValue("description", event.target.value);
    setDescCharCount(event.target.value.length);
  };

  return (
    <Box>
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
        fullWidth
        id="outlined-name"
        type="text"
        value={name}
        label={
          nameCharCount === 0
            ? "Product Name"
            : `Product Name : ${nameCharCount} / ${maxNameLength}`
        }
        onChange={handleNameCharCount}
        {...register("name", {
          required: "Product name is required",
          maxLength: {
            value: maxNameLength,
            message: `Product name should be less than ${maxNameLength} characters`,
          },
        })}
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
        multiline
        minRows={4}
        maxRows={10}
        fullWidth
        id="outlined-description"
        label={
          descCharCount === 0
            ? "Product Description"
            : `Product Description :  
            ${descCharCount} / ${maxDescLength}`
        }
        value={description}
        onChange={handleDescCharCount}
        {...register("description", {
          required: "Product description is required",
          maxLength: {
            value: maxDescLength,
            message: `Product description should be less than ${maxDescLength} characters`,
          },
        })}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
    </Box>
  );
}
