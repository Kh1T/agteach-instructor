import { Stack, Box, Typography, Grid2, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import SideBarImg from "../components/SideBarImg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import FormInput from "../components/login-signup/FormInput";
import dayjs from "dayjs";
import { setEmail, setDob } from "../features/user/userSlice";
import { useSignupMutation } from "../services/api/authApi";
import { CustomAlert } from "../components/CustomAlert";
import { useDispatch } from "react-redux";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, { isLoading, isError }] = useSignupMutation();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      dateOfBirth: "",
      role: "instructor",
    },
  });

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const submitHandler = async (data) => {
    try {
      data.dateOfBirth = dayjs(data.dateOfBirth).format("YYYY/MM/DD");
      await signup(data).unwrap();
      dispatch(setDob(data.dateOfBirth));
      dispatch(setEmail(data.email));
      navigate("additional");
    } catch (error) {
      setOpen(true);
    }
  };

  return (
    <Grid2
      container
      sx={{ justifyContent: { xs: "center", md: "center", lg: "center" }, flexWrap: "nowrap", padding: { lg: "0 100px 0 0"} }}
      my={{ xs: 20, lg: 0 }}
      spacing={{ xs: 5, md: 15, lg: 20 }}
      alignItems={"center"}
    >
      <CustomAlert
        label={
          isError
            ? "Email already exists. Please try another email."
            : "Signup Successful!"
        }
        severity={isError ? "error" : "success"}
        open={open}
        onClose={() => setOpen(false)}
      />
      <Grid2 sx={{ display: { xs: "none", md: "none", lg: "block" } }}>
        <SideBarImg />
      </Grid2>
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
        <form
          onSubmit={handleSubmit(submitHandler)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <FormInput
            label="Name"
            {...register("username", {
              required: "Please enter your name",
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <br />
          <Controller
            name="dateOfBirth"
            control={control}
            rules={{ required: "Please select your date of birth" }}
            render={({ field }) => (
              <FormInput
                label="Date of Birth"
                isDate={true}
                dateValue={field.value}
                onDateChange={(newDate) => field.onChange(newDate)}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth?.message}
              />
            )}
          />
          <br />
          <FormInput
            label="Email"
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
          <br />
          <FormInput
            label="Password"
            type="password"
            showPassword={showPassword}
            handleClickShowPassword={handleShowPassword}
            {...register("password", {
              required: "Please enter your password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              maxLength: {
                value: 20,
                message: "Password must be at most 20 characters",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                message:
                  "Password must contain at least one letter and one number",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <br />
          <FormInput
            label="Confirm Password"
            type="password"
            showPassword={showPassword}
            handleClickShowPassword={handleShowPassword}
            {...register("passwordConfirm", {
              required: "Please confirm your password",
              validate: (value) => {
                if (value !== watch("password")) {
                  return "Passwords do not match";
                }
              },
            })}
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm?.message}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ padding: "12px" }}
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
        <Typography textAlign="center">
          Already have an account?
          <Link to="/auth/login">Go Back</Link>
        </Typography>
      </Stack>
    </Grid2>
  );
}

export default Signup;
