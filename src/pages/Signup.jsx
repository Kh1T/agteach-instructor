import {
  Stack,
  Box,
  Typography,
  Button,
  FormControl,
  Grid2,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import InputField from "../components/InputField";
import SideBarImg from "../components/SideBarImg";

function Signup() {
  console.log(AdapterDayjs);
  return (
    <Grid2 container spacing={15} alignItems={"center"}>
      <SideBarImg />
      <Stack gap="20px">
        <Box
          display="flex"
          flexDirection="column"
          textAlign="center"
          gap="10px"
        >
          <Typography variant="h1">Create Account</Typography>
          <Typography color="dark.300">
            Get your account now to explore further on AgTeach.
          </Typography>
        </Box>

        <FormControl
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <InputField fieldName="Username" />
          {/* <InputField fieldName="Date of Birth" /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Date of Birth" />
          </LocalizationProvider>
          <InputField fieldName="Email" />
          <InputField fieldName="Password" fieldType="password" />

          <Button
            sx={{
              width: 460,
              height: 50,
              borderRadius: 2,
              width: "100%",
            }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Typography textAlign="center">
            Already have an account ? <a href="#">Go Back</a>
          </Typography>
        </FormControl>
      </Stack>
    </Grid2>
  );
}

export default Signup;
