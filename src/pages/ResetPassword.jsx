import { Button, Divider, Stack, Typography } from "@mui/material";
import agtechDark from "./../assets/login/logo-dark.svg";
import PasswordInput from "../components/PasswordInput";

function ResetPassword() {
  const gap = "20px";
  return (
    <Stack flexDirection="column" alignItems="center" gap="200px">
      <img
        style={{ width: "100px", height: "50px", paddingTop: "100px" }}
        src={agtechDark}
        alt="dark-logo"
      />

      <Stack gap={gap}>
        <Stack gap={gap}>
          <Typography variant="blgsm">Reset Password</Typography>
          <Typography variant="bmdr">
            Strong passwords include numbers, letters, and punctuation marks.
          </Typography>
          <PasswordInput fieldName={"New Password"} />
          <PasswordInput fieldName={"Confirm Password"} />
        </Stack>
        <Divider />

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
          fullWidth
        >
          Send reset link
        </Button>
      </Stack>
    </Stack>
  );
}

export default ResetPassword;
