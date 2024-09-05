import {
  Avatar,
  Grid2 as Grid,
  Typography,
  Stack,
  MenuItem,
  Divider,
} from "@mui/material";
import profileImg from "../assets/dashboard-setting/profile-img.png";
import CustomButton from "../components/CustomButton";
import CustomInputField from "../components/CustomInputField";

function SettingPage() {
  return (
    <Grid container direction="column" gap={5}>
      {/* Profile Section */}

      <Grid container direction="column" gap={2} alignContent="start">
        <Typography variant="h5">Profile</Typography>

        <Avatar
          sx={{ width: "140px", height: "140px" }}
          src={profileImg}
          variant="square"
        />
        <CustomButton
          sx={{ borderColor: "blue.main", color: "blue.main" }}
          variant="outlined"
        >
          CHANGE
        </CustomButton>
      </Grid>

      {/* Information Section */}
      <Grid container direction="column" gap={5}>
        <Stack height="100%" gap={2}>
          <Typography variant="h5">Personal Information</Typography>
          <Grid container height="10vh" gap={2}>
            <Grid container gap={2}>
              <CustomInputField fieldName="First Name" />
              <CustomInputField fieldName="Last Name" />
            </Grid>

            <Grid size={8}>
              <CustomInputField fieldName="Bio" multiline rows={4} fullWidth />
            </Grid>
          </Grid>
        </Stack>

        {/* Address Information Section */}

        <Stack gap={2}>
          <Typography variant="h5">Address Information</Typography>
          <CustomInputField fieldName="Address 1" />
          <CustomInputField
            fieldName="Location"
            noValidate
            autoComplete="off"
            select
          >
            <MenuItem value="Phnom Penh">Phnom Penh</MenuItem>
          </CustomInputField>
        </Stack>

        {/* Contact Information Section */}
        <Stack gap={2}>
          <Typography variant="h5">Contact Information</Typography>
          <CustomInputField fieldName="Phone Number" />
        </Stack>

        {/* Button */}

        <Grid container gap={2} justifyContent="end">
          <CustomButton
            sx={{ backgroundColor: "blue.main" }}
            variant="contained"
            size="large"
          >
            SAVE CHANGES
          </CustomButton>
          <CustomButton
            sx={{ borderColor: "blue.main", color: "blue.main" }}
            variant="outlined"
            size="large"
          >
            CANCEL
          </CustomButton>
        </Grid>
      </Grid>

      <Divider />

      {/* Acount Security */}

      <Grid container gap={2}>
        <Typography variant="h5">Account Security</Typography>
        <CustomInputField fieldName="Current Password" />
        <CustomInputField fieldName="New Password" />
        <CustomInputField fieldName="Confirm New Password" />
        <Grid
          container
          width="100%"
          gap={2}
          direction="row"
          justifyContent="end"
        >
          <CustomButton
            sx={{ backgroundColor: "blue.main" }}
            variant="contained"
            size="large"
          >
            SAVE CHANGES
          </CustomButton>
          <CustomButton
            sx={{ borderColor: "blue.main", color: "blue.main" }}
            variant="outlined"
            size="large"
          >
            CANCEL
          </CustomButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SettingPage;
