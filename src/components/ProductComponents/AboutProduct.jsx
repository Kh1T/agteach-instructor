import { TextField, Box, Divider } from "@mui/material";

export default function AboutProduct() {
  let name = "";
  return (
    <Box className="container">
      <h2>About this Product</h2>
      <Divider />
      <h3>What is your product name?</h3>
      <p>Your product name should be short and meaningful</p>
      <TextField
        fullWidth
        id="outlined-controlled"
        label="Title"
        value={name}
        // onChange={(event) => {
        //   setName(event.target.value);
        // }}
      />
      <p>eg: Grow Lights - LED or fluorescent grow lights</p>
      <h3>Tell us more about your product</h3>
      <p>Help explain what does the product do and key feature</p>
      <TextField
        fullWidth
        id="outlined-controlled"
        label="Description"
        value={name}
        // onChange={(event) => {
        //   setName(event.target.value);
        // }}
      />
    </Box>
  );
}
