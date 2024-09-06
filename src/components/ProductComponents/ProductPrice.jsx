import { Divider, Box, TextField, Typography } from "@mui/material";
import IconWithTitle from "../CourseProductComponents/IconWithTitle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TextSection from "../CourseProductComponents/TextSection";
import { useState } from "react";

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
export default function ProductPrice() {
  const [price, setPrice] = useState("");
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
        value={price}
        onChange={(event) => setPrice(event.target.value)}
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
