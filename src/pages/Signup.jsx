import {
  Stack,
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  TextField,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";

import InputField from "../components/InputField";
import SideBarImg from "../components/SideBarImg";

function Signup() {
  return (
    <Stack
      direction="row"
      justify="center"
      height="100%"
      alignItems="center"
      spacing="5em"
      pr="40px"
    >
      <SideBarImg />
      <Stack gap="20px">
        <Box
          display="flex"
          flexDirection="column"
          textAlign="center"
          gap="10px"
        >
          <Typography variant="h1">Welcome back Instructor</Typography>
          <Typography color="dark.300">
            Please login to continue to your account.
          </Typography>
        </Box>

        <FormControl
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <InputField fieldName="Username" />
          <InputField fieldName="Date of Birth" />
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
    </Stack>
  );
}

export default Signup;
