import { Divider, Box, TextField, Typography, ListItem , List } from "@mui/material";

export default function ProductPrice() {
  let name = "";
  return (
    <Box className="container">
      <Typography variant="h3">Product Price</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" fontWeight={"bold"}>
        Tell us about your product price
      </Typography>
      <Typography variant="subtitle2">
        Choosing a correct price strategy will help engage more customer
      </Typography>
      <TextField
        sx={{ my: 2 }}
        id="outlined-controlled"
        label="Price"
        value={name}
        // onChange={(event) => {
        //   setName(event.target.value);
        // }}
      />
      <List sx={{ listStyleType: "disc" }}>
        <ListItem>NOTE: AgTeach will deduct 20% from your total sale</ListItem>
        <ListItem>
          Example, if the product is $100 we will deduct $20 from your sale
        </ListItem>
      </List>
    </Box>
  );
}
