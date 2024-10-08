import {
  Grid2 as Grid,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Button,
} from "@mui/material";

import { useForm } from "react-hook-form";
import FormInput from "../components/login-signup/FormInput";
import CustomInputField from "../components/CustomInputField";
import SideBarImg from "../components/SideBarImg";
import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoginMutation } from "../services/api/authApi";
import { CustomAlert } from "../components/CustomAlert";
import { useDispatch, useSelector } from "react-redux";
import { checkLoginStatus } from "../features/user/authSlice";

function LoginPage() {
  const [login, { isLoading, isError }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const submitHandler = async (data) => {
    console.log(data);
    try {
      const response = await login(data).unwrap();
      console.log("Login successful", response);
      dispatch(checkLoginStatus(true));
      navigator("/");
    } catch (error) {
      console.error("Incorrect email or password", error);
      setOpen(true);
      setError(
        "email",
        { type: "manual", message: "Incorrect email or password" },
        { shouldFocus: true }
      );
      setError(
        "password",
        { type: "manual", message: "Incorrect email or password" },
        { shouldFocus: true }
      );
    }
  };

  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log('login',isAuthenticated);

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      sx={{
        justifyContent: { xs: "center", md: "center", lg: "start" },
        mx: { xs: 2, md: 0, lg: 0 },
      }}
      mt={{ xs: 50, md: 50, lg: 0 }}
      spacing={10}
    >
      <CustomAlert
        label={
          isError
            ? "Incorrect email or password."
            : "Login Successful!"
        }
        severity={isError ? "error" : "success"}
        onClose={() => setOpen(false)}
        open={open}
      />
      <Grid sx={{ display: { xs: "none", md: "none", lg: "block" } }}>
        <SideBarImg />
      </Grid>
      <Grid>
        <Stack>
          <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            gap="20px"
          >
            <Typography variant="h1">Welcome back Instructor</Typography>
            <Typography color="dark.300">
              Please login to continue to your account.
            </Typography>
          </Box>
          <Box>
            <form
              onSubmit={handleSubmit(submitHandler)}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <FormInput
                variant="outlined"
                label="Email"
                fullWidth
                {...register("email", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <FormInput
                variant="outlined"
                label="Password"
                fullWidth
                type="password"
                {...register("password", {
                  required: "Please enter your password",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                showPassword={showPassword}
                handleClickShowPassword={handleShowPassword}
              />

              <FormControlLabel
                control={<Checkbox value="remember" />}
                label="Keep me logged in"
              />
              <Link to="/auth/forgot-password">Forgot Password?</Link>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{
                  marginTop: "10px",
                  padding: "12px",
                }}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <Typography>
                Need an account? <Link to="/auth/signup">Create one</Link>
              </Typography>
            </form>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
