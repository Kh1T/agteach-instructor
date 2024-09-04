import { TextField, Typography } from "@mui/material";
import PasswordInput from "../components/PasswordInput";
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
    <Stack
      direction="row"
      justify="center"
      height="100%"
      alignItems="center"
      spacing="10%"
    >
      <Box style={{ position: "relative" }}>
        <Box>
          <img src={loginImg} alt="login-img" style={{ height: "100vh" }} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "30%",
            zIndex: "tooltip",
          }}
        >
          <img src={logo} alt="logo" />
          <Box width="350px">
            <Typography variant="h1" color="white">
              Teach and Sell
            </Typography>
            <Typography variant="bmdr" color="white">
              aspiring farmers and plant enthusiasts, offering a one-stop
              solution for all needs on agricultural journey
            </Typography>
          </Box>
        </Box>
      </Box>

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

          <PasswordInput />

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
    </Stack>
  );
}

export default LoginPage;
