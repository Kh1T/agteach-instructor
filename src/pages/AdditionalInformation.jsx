import {
  Box,
  Divider,
  Grid2 as Grid,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import InputField from "../components/InputField";
import logo from "./../assets/logo.svg";
import CustomButton from "../components/CustomButton";

function AdditionalInformation() {
  return (
    <Grid container justifyContent="center" direction="column" mt={12} gap={15}>
      <Box component="img" src={logo} />
      <Grid container justifyContent="center" alignItems="center" gap={12}>
        <Stack textAlign="center">
          <Box
            border="none"
            component="iframe"
            src="https://lottie.host/embed/288044aa-d34d-480e-a0a5-90f2169ad2a9/3QIerLarqo.json"
          />
          <Typography variant="h3">Almost There</Typography>
          <Typography variant="bmdr" color="dark.200">
            Just one more step. Add your personal information and contact to
            continue
          </Typography>
        </Stack>
        <form>
          <Stack flexDirection="column" gap={2}>
            <Typography variant="blgsm">Name & Address</Typography>
            <Stack flexDirection="row" gap={2}>
              <InputField fieldName="First name"></InputField>
              <InputField fieldName="Last name"></InputField>
            </Stack>

            {/* Address Field */}

            <TextField label="Address" noValidate autoComplete="off" select>
              <MenuItem value="Phnom Penh">Phnom Penh</MenuItem>
            </TextField>

            <InputField fieldName="Address 1"></InputField>

            <Divider />

            <Typography variant="blgsm">Email & Phone</Typography>
            <Stack flexDirection="row" gap={2}>
              <InputField fieldName="Email"></InputField>
              <InputField fieldName="Phone Number"></InputField>
            </Stack>
            <CustomButton>Continue</CustomButton>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
}

export default AdditionalInformation;
