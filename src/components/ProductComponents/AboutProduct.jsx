import { TextField, Box, Divider, Typography, Stack } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import IconWithTitle from "../CourseProductComponents/IconWithTitle";
import TextSection from "../CourseProductComponents/TextSection";
export default function AboutProduct() {
  let name = "";
  return (
    <Box className="container">
      <IconWithTitle
        title={"About this Product"}
        icon={<InfoIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2"></Typography>
      <TextSection
        title={"What is your product name?"}
        description={"Your product name should be short and meaningful."}
      />
      <TextField
        sx={{ my: 2 }}
        fullWidth
        id="outlined-controlled"
        label="Title"
        // value={name}
        // onChange={(event) => {
        //   setName(event.target.value);
        // }}
      />
      <Typography variant="bmdr" sx={{ mt: 2 }}>
        eg: Grow Lights - LED or fluorescent grow lights
      </Typography>

      <TextSection
        title={"Tell us more about your product"}
        description={"Help explain what does the product do and key feature"}
      />
      <TextField
        slotProps={{
          input: { sx: { alignItems: "flex-start", height: "156px" } },
        }}
        sx={{ my: 2 }}
        fullWidth
        id="outlined-controlled"
        label="Description"
        // value={name}
        // onChange={(event) => {
        //   setName(event.target.value);
        // }}
      />
    </Box>
  );
}
