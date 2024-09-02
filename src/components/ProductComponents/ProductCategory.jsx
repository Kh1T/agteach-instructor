import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Button,
  Box,
  SvgIcon,
  Typography,
} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function ProductCategory() {
  let age = 0;
  return (
    <Box className="container">
      <Button
        variant="text"
        color="black"
        sx={{ gap: "8px", paddingLeft: "0" }}
      >
        <SvgIcon
          fontSize={"small"}
          color="gray"
          height={"12px"}
          component={ArrowBackIosIcon}
        />

        <Typography sx={{ textDecoration: "underline" }}>Go Back</Typography>
      </Button>
      <div>
        <h2>Product Category</h2>
      </div>
      <Divider />
      <p>Please choose an appropriate category for this product</p>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Category"
          //   onChange={handleChange}
        >
          <MenuItem value={10}>Plant</MenuItem>
          <MenuItem value={20}>Fertilizer</MenuItem>
          <MenuItem value={30}>Tool</MenuItem>
        </Select>
      </FormControl>
      <Divider />
    </Box>
  );
}
