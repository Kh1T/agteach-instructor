import { Grid2, TextField, Typography } from "@mui/material";
import InputField from "../components/InputField";
import SideBarImg from "../components/SideBarImg";
import loginImg from "./../assets/login/login-img.png";
import logo from "./../assets/login/agteach-logo.svg";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  FormControl,
} from "@mui/material";

import { useTheme } from "@emotion/react";

function LoginPage() {
  const theme = useTheme();

  return (
    <Grid2 container alignItems="center" spacing={10}>
      <SideBarImg />
      <Stack gap="20px">
        <Box
          display="flex"
          flexDirection="column"
          textAlign="center"
          gap="10px"
        >
          <Typography sx={theme.typography.h1}>
            Welcome back Instructor
          </Typography>
          <Typography color="dark.300">
            Please login to continue to your account.
          </Typography>
        </Box>
        <FormControl
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TextField label="Enter your email" required />

          <InputField fieldName={"Password"} fieldType="password" />

          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Keep me logged in"
          />
          <a href="#">Forgot Password ?</a>
          <Button
            sx={{
              width: 460,
              height: 50,
              borderRadius: 2,
            }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Typography>
            Need an account ? <a href="#">Create one</a>
          </Typography>
        </FormControl>
      </Stack>
    </Grid2>
  );
}

export default LoginPage;
