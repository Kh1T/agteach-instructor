import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import AgtechDarkLogo from "./../assets/login/logo-dark.svg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTheme } from "@emotion/react";

function ForgotPassword() {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "50vh",
      }}
    >
      <img
        style={{ width: "100px", height: "50px" }}
        src={AgtechDarkLogo}
        alt=""
      />
      <Stack>
        <Box></Box>
        <Box>
          <Typography sx={theme.typography.blgsm}>
            Enter your email address
          </Typography>
          <TextField
            label="Email *"
            placeholder="eg: johndoe@abc.xyz"
            fullWidth
          />
          <hr />
          <Stack>
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
              Send reset link
            </Button>
            <Button
              sx={{
                width: 460,
                height: 50,
                borderRadius: 2,
              }}
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
            >
              <ArrowBackIosIcon sx={{ fontSize: "medium" }} />
              Back to login
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}

export default ForgotPassword;
