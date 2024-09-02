import { TextField } from "@mui/material";
import PasswordInput from "../components/PasswordInput";
import loginImg from "./../assets/login/login-img.png";
import logo from "./../assets/login/agteach-logo.svg";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
} from "@mui/material";

import { useTheme } from "@emotion/react";

function LoginPage() {
  const theme = useTheme();

  console.log(theme.typography.h1);

  return (
    <Stack
      direction="row"
      justify="center"
      height="100%"
      alignItems="center"
      spacing="10%"
    >
      <div style={{ position: "relative" }}>
        <Box>
          <img src={loginImg} alt="login-img" style={{ height: "100vh" }} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "40%",
            zIndex: "tooltip",
          }}
        >
          <img src={logo} alt="logo" />
          <p style={theme.typography.h1}>Teach and Sell</p>
        </Box>
      </div>

      <Stack>
        <div style={{ textAlign: "center" }}>
          <h1>Welcome back Instructor</h1>
          <p style={{ color: theme.palette.dark["300"] }}>
            Please login to continue to your account.
          </p>
        </div>
        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
          <p>
            Need an account ? <a href="#">Create one</a>
          </p>
        </form>
      </Stack>
    </Stack>
  );
}

export default LoginPage;
