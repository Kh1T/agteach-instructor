import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useResendVerifyCodeMutation } from "../../services/api/authApi";
import { useState } from "react";
import { CustomAlert } from "../CustomAlert";
import { useSelector } from "react-redux";
import { ArrowForwardRounded } from "@mui/icons-material";

const ResendCodeButton = ({ email, timeoutRef }) => {
  const [open, setOpen] = useState(true);

  const [resendVerifyCode, { isLoading, isError, isSuccess, error }] =
    useResendVerifyCodeMutation();

  const handleResend = () => {
    resendVerifyCode(email);
  };

  const { isAuthenticated: isLogin, isVerify } = useSelector(
    (state) => state.auth
  );
  console.log("isLogin", isLogin, "isVerify", isVerify);

  const handleOnClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setOpen(true);
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 4000);
  };

  return (
    <Box onClick={handleOnClick}>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Typography variant="bssm" color="dark.300">Didn't receive the code?</Typography>
        <Button
          sx={{
            textTransform: "none",
            color: "purple.main",
            paddingY: 0,
            typography: "bssm",
          }}
          linkButton={true}
          startIcon={<ArrowForwardRounded />}
          onClick={handleResend}
          disabled={isLoading}
          variant="text"
        >
          {isLoading
            ? "Requesting..."
            : isLogin && !isVerify
              ? "Request code"
              : "Resend code"}
        </Button>
      </Stack>
      {isSuccess && (
        <CustomAlert
          label="Code sent successfully , Please Check your email!"
          open={open}
          onClose={() => setOpen(false)}
          severity="success"
        />
      )}
      {isError && (
        <CustomAlert
          label={`Please wait ${Math.floor(error?.data?.remainingCooldown / 1000)}s before request resend the code again.`}
          open={open}
          onClose={() => setOpen(false)}
          severity="error"
        />
      )}
    </Box>
  );
};

export default ResendCodeButton;
