import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  Grid2,
} from "@mui/material";
import agtechDark from "./../assets/login/logo-dark.svg";
import ghostImg from "./../assets/login/ghost-img.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTheme } from "@emotion/react";

function ForgotPassword() {
  const theme = useTheme();
  const gap = "20px";

  return (
    <Grid2
      container
      direction="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box
        style={{ width: "100px", height: "50px", paddingTop: "100px" }}
        src={agtechDark}
        alt="dark-logo"
      />
      <Grid2
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={15}
      >
        <Stack textAlign="center" gap={gap}>
          <img src={ghostImg} alt="ghost-img" />
          <Box>
            <Typography variant="h3">Forgot Your Password?</Typography>
            <Box width="400px">
              <Typography variant="bmdr">
                Please enter the email address associated with this account and
                we will email you a link to reset your password
              </Typography>
            </Box>
          </Box>
        </Stack>
        <Stack gap={gap}>
          <Stack gap={gap}>
            <Typography variant="blgsm" color="dark.200">
              Enter your email address
            </Typography>
            <TextField
              label="Email *"
              placeholder="eg: johndoe@abc.xyz"
              fullWidth
            />
          </Stack>
          <Divider />
          <Stack gap="15px">
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
        </Stack>
      </Grid2>
    </Grid2>
  );
}

export default ForgotPassword;
