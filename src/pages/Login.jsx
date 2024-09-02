import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import loginImg from "./../assets/login/login-img.png";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
} from "@mui/material";

import { useTheme } from "@emotion/react";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  console.log(theme.palette.grey);
  return (
    <Stack direction="row" justify="center" alignItems="center" spacing="260px">
      <img src={loginImg} alt="login-img" />
      <Stack>
        <div style={{ textAlign: "center" }}>
          <h1>Welcome back Instructor</h1>
          <p style={{ color: theme.palette.dark["300"] }}>
            Please login to continue to your account.
          </p>
        </div>
        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TextField label="Enter your email" required />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
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
            Need an account?<a href="#">Create one</a>
          </p>
        </form>
      </Stack>
    </Stack>
  );
}

export default LoginPage;
