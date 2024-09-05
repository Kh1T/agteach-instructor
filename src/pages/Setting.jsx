import {
  Avatar,
  Box,
  Grid2 as Grid,
  Typography,
  TextField,
} from "@mui/material";
import profileImg from "../assets/dashboard-setting/profile-img.png";
import CustomButton from "../components/CustomButton";

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

      {/* Personal Information Section */}
      <Grid>
        <Typography variant="h5">Personal Information</Typography>
        <Grid container gap={2}>
          <Grid size={4} container direction="column">
            <TextField></TextField>
            <TextField></TextField>
          </Grid>
          <Grid size={8} container>
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue="Default Value"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SettingPage;
