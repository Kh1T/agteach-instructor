import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Container,
  Stack,
  Grid,
  Divider,
} from "@mui/material";
import LogoLink from "../components/login-signup/LogoLink";
import { useForm } from "react-hook-form";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link as RouterLink } from "react-router-dom";
import { CustomAlert } from "../components/CustomAlert";
import { useForgotPasswordMutation } from "../services/api/authApi";
import forgetPasswordImg from "../assets/forgotpassword.png";

/**
 * Renders a form to reset the user's password.
 *
 * The form will accept an email address and, if valid, send a reset link to the user's email address.
 * If the user is not found or the email is invalid, an error message will be displayed.
 *
 * @returns {React.ReactElement} A JSX element representing the password reset form.
 */
const ForgotPassword = () => {
  const timeoutRef = useRef(null);
  const [forgotPassword, { isLoading, isError, error, isSuccess }] =
    useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(true);

  const handleOnClick = () => {
    setOpen(true);
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 4000);
  };

  const onSubmit = async (data) => {
    await forgotPassword({ email: data.email });
    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    handleOnClick();
  };

  return (
    <Box>
      <Container maxWidth="md">
        <Stack
          paddingTop={{ xs: 8, md: 10 }}
          alignItems="center"
          justifyContent="start"
          textAlign="center"
          spacing={4}
        >
          <LogoLink />

          <Grid container spacing={4} alignItems="center">
            {/* Left side: Image and text */}
            <Grid
              item
              xs={11}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={forgetPasswordImg}
                alt="Forgot Password"
                style={{
                  width: "80%",
                  maxWidth: "300px",
                  height: "auto",
                  marginBottom: "16px",
                }}
              />

              <Typography
                variant="h4"
                textAlign="center"
                sx={{ whiteSpace: "nowrap" }}
              >
                Forgot Your Password?
              </Typography>
              <Typography variant="bmdmd">
                Please enter the email address associated with this account and
                we will email you a link to reset your password.
              </Typography>
            </Grid>

            {/* Right side: Form */}
            <Grid
              item
              xs={11}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Stack spacing={2} sx={{ width: "100%", maxWidth: "400px" }}>
                <Typography variant="h4" textAlign="center">
                  Enter your email address
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                  />

                  <Divider sx={{ marginY: 2 }} />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ padding: "12px", marginY: 2 }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send reset link"}
                  </Button>
                  <Link component={RouterLink} to="/auth/login">
                    <Button
                      fullWidth
                      startIcon={<ArrowBackIosNewIcon />}
                      variant="outlined"
                    >
                      Back to login
                    </Button>
                  </Link>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>

      {/* Snackbar for displaying messages */}
      {isSuccess && (
        <CustomAlert
          label="Code sent successfully , Please Check your email!"
          open={open}
          onClose={() => setOpen(false)}
          severity="success"
        />
      )}
      {isError &&  (
        <CustomAlert
          label={ error?.data?.remainingCooldown ?
            `Please wait ${Math.floor(error?.data?.remainingCooldown / 1000)}s before request resend restpassword link again.`
            : error?.data?.message
          }
          open={open}
          onClose={() => setOpen(false)}
          severity="error"
        />
      )}
    </Box>
  );
};

export default ForgotPassword;
