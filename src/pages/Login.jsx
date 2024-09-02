import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import loginImg from "./../assets/login/login-img.png";
import { Stack } from "@mui/material";

const providers = [{ id: "credentials", name: "Email and Password" }];

function LoginPage() {
  return (
    <Stack direction="row" justify="center" alignItems="center">
      <img src={loginImg} alt="login-img" />
      <Box sx={{ width: 500, maxWidth: "100%" }}>
        <TextField fullWidth label="Enter Your Email" id="fullWidth" />
      </Box>
    </Stack>
  );
}

export default LoginPage;
