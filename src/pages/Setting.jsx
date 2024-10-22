import {
  Avatar,
  Grid2 as Grid,
  Typography,
  Stack,
  TextField,
  Box,
  Autocomplete,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import CustomFileUpload from "../components/CustomFileUpload";
import {
  useGetInstructorInfoQuery,
  useGetLocationsQuery,
  useUpdateInstructorInfoMutation,
  useUpdateInstructorPasswordMutation,
} from "../services/api/authApi";
import { useForm } from "react-hook-form";
import { CustomAlert } from "../components/CustomAlert";
import FormInput from "../components/login-signup/FormInput";

function SettingPage() {
  const [open, setOpen] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [profileImg, setProfileImg] = useState("");

  const { data: locationData } = useGetLocationsQuery();
  const { data: instructorData, refetch, isLoading } = useGetInstructorInfoQuery();
  const [updateInfo, { isLoading: updateInfoLoading }] = useUpdateInstructorInfoMutation();
  const [updatePassword] = useUpdateInstructorPasswordMutation();

  const { register: basicInfoRegister, handleSubmit: handleBasicInfoSubmit, setValue, reset: resetBasicInfo, formState: { errors: basicInfoErrors } } = useForm();
  const { register: securityRegister, handleSubmit: handleSecuritySubmit, reset: resetSecurity, formState: { errors: securityErrors }, watch } = useForm();

  const locations = locationData?.data;
  const instructorInfo = instructorData?.data?.instructor;

  // Set the initial data once it's fetched
  useEffect(() => {
    if (instructorInfo) {
      resetBasicInfo({
        firstName: instructorInfo.firstName,
        lastName: instructorInfo.lastName,
        bio: instructorInfo.bio || "",
        phone: instructorInfo.phone || "",
        address: instructorInfo.address || "",
        location_id: instructorInfo.location.locationId,
      });
      // setValue("location_id", instructorInfo.location_id);
      resetSecurity({
        email: instructorInfo.email,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setProfileImg(setTimeout(() => {
        setProfileImg(`${instructorInfo.imageUrl}?${new Date().getTime()}`); // Reload the image with cache-busting
      }), 100);
    }
  }, [instructorInfo, resetBasicInfo, resetSecurity, setValue]);


  // Handle Profile Image Upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileSelected(true);
      setProfileImg(URL.createObjectURL(file)); // Update the image temporarily with the new file's URL
      
      const formData = new FormData();
      formData.append("photo", file);
  
      try {
        await updateInfo(formData).unwrap();
        refetch(); // Ensure you get the updated instructor info
        setProfileImg(""); // Temporarily clear the image
        setTimeout(() => {
          setProfileImg(`${instructorInfo.imageUrl}?${new Date().getTime()}`); // Reload the image with cache-busting
        }, 100); // Small delay to ensure the image is reloaded
      } catch (error) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error uploading image");
        setSnackbarOpen(true);
      }
    }
    setOpen(false);
  };
  

  // Handle Basic Info Submission
  const onSubmitBasicInfo = async (data) => {
    console.log('data', data);
    try {
      const response = await updateInfo(data).unwrap();
      console.log("response", response);
      refetch();
      setSnackbarSeverity("success");
      setSnackbarMessage("Information updated successfully");
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error updating information");
    } finally {
      setSnackbarOpen(true);
    }
  };

  // Handle Password Submission
  const onSubmitPassword = async (data) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;

    try {
      const response = await updatePassword({
        passwordCurrent: currentPassword,
        password: newPassword,
        passwordConfirm: confirmNewPassword,
      }).unwrap();

      if (response.status === "success") {
        setSnackbarSeverity("success");
        setSnackbarMessage("Password updated successfully");
        resetSecurity();
      }
    } catch (err) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error updating password");
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <Box mb={15}>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container direction="column" gap={5}>
          {/* Profile Section */}
          <Stack spacing={2} width={'140px'}>
            <Typography variant="h5" color="primary">Profile</Typography>
            <Avatar src={profileImg} variant="square" sx={{ width: 140, height: 140 }} />
            <CustomButton variant="outlined" sx={{ color: "blue.main", borderColor: "blue.main" }} onClick={() => setOpen(true)}>{updateInfoLoading ? "CHANGING..." : "CHANGE"}</CustomButton>
            {open && !fileSelected && <CustomFileUpload open={open} handleClose={() => setOpen(false)} onChange={handleImageUpload} />}
          </Stack>

          <form onSubmit={handleBasicInfoSubmit(onSubmitBasicInfo)}>
            {/* Personal Information */}
            <Stack spacing={2}>
              <Typography variant="h5" color="primary">Personal Information</Typography>
              <Stack direction="row" gap={2}>
              <Stack gap={2} width={"50%"}>
                <TextField label="First Name" fullWidth {...basicInfoRegister("firstName", { required: "Firstname is required" })} error={!!basicInfoErrors.firstName} helperText={basicInfoErrors.firstName?.message} />
                <TextField label="Last Name" fullWidth {...basicInfoRegister("lastName", { required: "Lastname is required" })} error={!!basicInfoErrors.lastName} helperText={basicInfoErrors.lastName?.message} />
              </Stack>
              <TextField multiline rows={4} label="Bio" fullWidth {...basicInfoRegister("bio")} /></Stack>
              <Typography variant="h5" pt={2} color="primary">Address Information</Typography>
              <TextField label="Address" fullWidth {...basicInfoRegister("address", { required: "Address is required" })} error={!!basicInfoErrors.address} helperText={basicInfoErrors.address?.message} />
              <Autocomplete
                options={locations}
                defaultValue={locations?.find(loc => loc.location_id === instructorInfo.location_id)}
                onChange={(event, value) => setValue("location_id", value.location_id)}
                getOptionLabel={option => option.name}
                renderInput={params => <TextField {...params} label="City" />}
              />
              <Typography variant="h5" pt={2} color="primary">Contact Information</Typography>
              <TextField label="Phone Number" disabled {...basicInfoRegister("phone")} />
              <Box display="flex" justifyContent="flex-end" gap={2}>
              <CustomButton type="submit" variant="contained" sx={{ bgcolor: "blue.main" }}>SAVE CHANGES</CustomButton>
              <CustomButton variant="outlined" sx={{ color: "blue.main", borderColor: "blue.main" }} onClick={() => resetBasicInfo()}>CANCEL</CustomButton></Box>
            </Stack>
          </form>

          <Divider />

          {/* Security Section */}
          <form onSubmit={handleSecuritySubmit(onSubmitPassword)}>
            <Stack spacing={2}>
              <Typography variant="h5" color="primary">Account Security</Typography>
              <TextField label="Email" disabled {...securityRegister("email")} />
              <FormInput label="Current Password" type="password" {...securityRegister("currentPassword", { required: "Current password is required" })} error={!!securityErrors.currentPassword} helperText={securityErrors.currentPassword?.message} />
              <FormInput label="New Password" type="password" {...securityRegister("newPassword", { required: "New password is required", minLength: { value: 8, message: "Password must be at least 8 characters long" } })} error={!!securityErrors.newPassword} helperText={securityErrors.newPassword?.message} />
              <FormInput label="Confirm New Password" type="password" {...securityRegister("confirmNewPassword", { required: "Please confirm the new password", validate: value => value === watch("newPassword") || "Passwords don't match" })} error={!!securityErrors.confirmNewPassword} helperText={securityErrors.confirmNewPassword?.message} />
              <Box display="flex" justifyContent="flex-end" gap={2}>
              <CustomButton type="submit" variant="contained" sx={{ bgcolor: "blue.main" }}>SAVE CHANGES</CustomButton>
              <CustomButton variant="outlined" sx={{ color: "blue.main", borderColor: "blue.main" }} onClick={() => resetSecurity()}>CANCEL</CustomButton></Box>
            </Stack>
          </form>

          <CustomAlert open={snackbarOpen} onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} label={snackbarMessage} />
        </Grid>
      )}
    </Box>
  );
}

export default SettingPage;
