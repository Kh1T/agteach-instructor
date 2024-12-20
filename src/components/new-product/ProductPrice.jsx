import { Divider, Box, TextField, Typography } from "@mui/material";
import IconWithTitle from "../course-product/IconWithTitle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TextSection from "../course-product/TextSection";

import { Money } from "@mui/icons-material";

/**
 * ProductPrice component renders a page for instructors to input product price.
 *
 * It renders the page with the following components:
 *   - IconWithTitle component with title and icon
 *   - Divider component
 *   - TextSection component with title and description
 *   - TextField component for inputting price
 *   - Typography component with two notes:
 *     - AgTeach will deduct 20% from the total sale
 *     - Example, if the product is $100 we will deduct $20 from your sale
 *
 * The component is given no props.
 *
 * The component returns a Box component with children.
 */

export default function ProductPrice({ errors, register }) {
  return (
    <Box className="container">
      <IconWithTitle
        title="Product Price"
        icon={<AttachMoneyIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <TextSection
        title="Enter your product price (USD)"
        description={
          "Choosing a correct price strategy will help engage more customers"
        }
      />
      <TextField
        sx={{ my: 2 }}
        id="price"
        label="Price"
        type="number"
        fullWidth
        slotProps={{ htmlInput: { step: "0.01" } }}
        {...register("price", {
          required: "Price is required",
          min: {
            value: 1,
            message: "Price is required and Cannot be less than 1.",
          },
          max: {
            value: 1000,
            message: "Price must be less than 1000.",
          },
        })}
        error={!!errors.price}
        helperText={errors.price?.message}
      />
      <Typography component="ul">
        <Typography variant="bsr" color="dark.300" paddingY={1} component="li">
          NOTE: AgTeach will deduct 20% from your total sale
        </Typography>
        <Typography variant="bsr" color="dark.300" component="li">
          Example, if the product is $100 we will deduct $20 from your sale
        </Typography>
      </Typography>
    </Box>
  );
}
