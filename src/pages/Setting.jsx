import {
  Avatar,
  Grid2 as Grid,
  Typography,
  Stack,
  MenuItem,
  Divider,
  Box,
} from "@mui/material";
import { useState } from "react";
import AvatarImg from "../assets/dashboard-setting/profile-img.png";
import CustomButton from "../components/CustomButton";
import CustomInputField from "../components/CustomInputField";
import CustomFileUpload from "../components/CustomFileUpload";

function SettingPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // State to hold the uploaded image URL
  const [profileImg, setProfileImg] = useState(AvatarImg);

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl); // Update state with the new image URL
    }
  };

  return (
    <Grid container direction="column" gap={5} pb={4}>
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
          onClick={handleOpen}
        >
          CHANGE
        </CustomButton>
        <CustomFileUpload
          open={open}
          handleClose={handleClose}
          onChange={handleImageUpload}
        />
      </Grid>

      {/* Information Section */}
      <Grid container direction="column" gap={5}>
        <Box gap={2}>
          <Typography variant="h5">Personal Information</Typography>
          <Stack direction="row" gap={2}>
            <Grid item container size={4} gap={2}>
              <CustomInputField fieldName="First Name" />
              <CustomInputField fieldName="Last Name" />
            </Grid>
            <Grid item size={7} width="100%">
              <CustomInputField fieldName="Bio" multiline rows={4} fullWidth />
            </Grid>
          </Stack>
        </Box>

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
