import { Divider, Box, TextField } from "@mui/material";

export default function ProductPrice() {
  let name = "";
  return (
    <Box className="container">
      <h2>Product Price</h2>
      <Divider />
      <h3>Tell us about your product price</h3>
      <p>Choosing a correct price strategy will help engage more customer</p>
      <TextField
        id="outlined-controlled"
        label="Price"
        value={name}
        // onChange={(event) => {
        //   setName(event.target.value);
        // }}
      />
      <ul>
        <li>NOTE: AgTeach will deduct 20% from your total sale</li>
        <li>
          Example, if the product is $100 we will deduct $20 from your sale
        </li>
      </ul>
    </Box>
  );
}
