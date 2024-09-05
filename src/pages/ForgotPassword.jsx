import {
  Box,
  Divider,
  Stack,
  TextField,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import agtechDark from "./../assets/login/logo-dark.svg";
import ghostImg from "./../assets/login/ghost-img.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const gap = "20px";

  return (
    <Grid
      container
      direction="column"
      alignContent="center"
      justifyContent="space-between"
      spacing={25}
      mt={4}
    >
      <Box component="img" src={agtechDark} alt="dark-logo" />

      <Grid
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
        {/* Form input */}
        <Stack gap={gap} sx={{ width: { sm: "100%", lg: "500px" } }}>
          <Stack gap={gap}>
            <Typography variant="blgsm">Enter your email address</Typography>
            <TextField
              label="Email *"
              placeholder="eg: johndoe@abc.xyz"
              fullWidth
            />
          </Stack>
          <Divider />
          <CustomButton color="primary" variant="contained">
            Send reset link
          </CustomButton>
          <Link to="..">
            <CustomButton color="primary" variant="outlined">
              <ArrowBackIosIcon sx={{ fontSize: "medium" }} />
              Back to login
            </CustomButton>
          </Link>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default ForgotPassword;