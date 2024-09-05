import { TextField, Box, Divider, Typography, Stack } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { iconContainerStyle } from "../../theme/IconBg";
export default function AboutProduct() {
  let name = "";
  return (
    <Box className="container">
      <Stack direction="row" gap={1} alignItems="center">
        <Box sx={iconContainerStyle}>
          <InfoIcon sx={{color: "common.white"}}/>
        </Box>
        <Typography variant={"h3"}>About this Product</Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" fontWeight={"bold"}>
        What is your product name?
      </Typography>
      <Typography variant="subtitle2" >
        Your product name should be short and meaningful
      </Typography>
      <TextField
        sx={{ my: 2 }}
        fullWidth
        id="outlined-controlled"
        label="Title"
        value={name}
        // onChange={(event) => {
        //   setName(event.target.value);
        // }}
      />
      <Typography variant="subtitle2" sx={{ mt: 2 }}>
        eg: Grow Lights - LED or fluorescent grow lights
      </Typography>
      <Typography variant="h6" fontWeight={"bold"} marginTop={4}>
        Tell us more about your product
      </Typography>
      <Typography variant="subtitle2" >
        Help explain what does the product do and key feature
      </Typography>
      <TextField
        sx={{ my: 2 }}
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
