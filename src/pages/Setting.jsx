import {
  Avatar,
  Grid,
  Typography,
  Stack,
  TextField,
  Box,
  Autocomplete,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import CustomButton from "../components/CustomButton";
import CustomFileUpload from "../components/CustomFileUpload";
import { CustomAlert } from "../components/CustomAlert";
import FormInput from "../components/login-signup/FormInput";

import {
  useGetInstructorInfoQuery,
  useGetLocationsQuery,
  useUpdateInstructorInfoMutation,
  useUpdateInstructorPasswordMutation,
} from "../services/api/authApi";

function SettingPage() {
  // State Management
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    current: false,
    new: false,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState({
    profileImg: false,
    basicInfo: false,
  });

  // API Queries and Mutations
  const { data: locationData } = useGetLocationsQuery();
  const { data: instructorData, refetch, isLoading } = useGetInstructorInfoQuery();
  const [updateInfo] = useUpdateInstructorInfoMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] =
    useUpdateInstructorPasswordMutation();

  // Form Management
  const {
    register: registerBasicInfo,
    handleSubmit: handleBasicInfoSubmit,
    reset: resetBasicInfo,
    setValue,
    formState: { errors: basicInfoErrors },
  } = useForm();
  const {
    register: registerSecurity,
    handleSubmit: handleSecuritySubmit,
    reset: resetSecurity,
    formState: { errors: securityErrors },
    watch,
  } = useForm();

  const locations = locationData?.data;
  const instructorInfo = instructorData?.data?.instructor;

  // Populate form on mount with instructor's info
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
      resetSecurity({
        email: instructorInfo.email,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setProfileImage(`${instructorInfo.imageUrl}?${new Date().getTime()}`);
    }
  }, [instructorInfo, resetBasicInfo, resetSecurity]);

  // Image Upload Handler
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsImageSelected(true);
    setProfileImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("photo", file);

    try {
      setLoading((prev) => ({ ...prev, profileImg: true }));
      await updateInfo(formData).unwrap();
      refetch();
      setSnackbar({ open: true, message: "Profile image updated successfully", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Error uploading image", severity: "error" });
    } finally {
      setLoading((prev) => ({ ...prev, profileImg: false }));
      setDialogOpen(false);
      setIsImageSelected(false);
    }
  };

  // Handle Basic Info Submission
  const handleBasicInfoSubmission = async (data) => {
    try {
      setLoading((prev) => ({ ...prev, basicInfo: true }));
      await updateInfo(data).unwrap();
      refetch();
      setSnackbar({ open: true, message: "Information updated successfully", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Error updating information", severity: "error" });
    } finally {
      setLoading((prev) => ({ ...prev, basicInfo: false }));
    }
  };

  // Handle Password Submission
  const handlePasswordSubmit = async (data) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;
    try {
      const response = await updatePassword({
        passwordCurrent: currentPassword,
        password: newPassword,
        passwordConfirm: confirmNewPassword,
      }).unwrap();

      if (response.status === "success") {
        setSnackbar({ open: true, message: "Password updated successfully", severity: "success" });
        resetSecurity();
      }
    } catch (err) {
      setSnackbar({ open: true, message: "Error updating password", severity: "error" });
    }
  };

  return (
    <Box mb={15}>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container direction="column" gap={5}>
          {/* Profile Section */}
          <Stack spacing={2} width="140px">
            <Typography variant="h5" color="primary">Profile</Typography>
            <Avatar src={profileImage} variant="square" sx={{ width: 140, height: 140 }} />
            <CustomButton
              variant="outlined"
              sx={{ color: "blue.main", borderColor: "blue.main" }}
              onClick={() => setDialogOpen(true)}
            >
              {loading.profileImg && isImageSelected ? "CHANGING..." : "CHANGE"}
            </CustomButton>
            {dialogOpen && !isImageSelected && (
              <CustomFileUpload
                open={dialogOpen}
                handleClose={() => setDialogOpen(false)}
                onChange={handleImageUpload}
              />
            )}
          </Stack>

          {/* Basic Info Form */}
          <form onSubmit={handleBasicInfoSubmit(handleBasicInfoSubmission)}>
            <Stack spacing={2}>
              <Typography variant="h5" color="primary">Personal Information</Typography>
              <Stack direction="row" gap={2}>
                <Stack gap={2} width="50%">
                  <TextField
                    label="First Name"
                    fullWidth
                    {...registerBasicInfo("firstName", { required: "First name is required" })}
                    error={!!basicInfoErrors.firstName}
                    helperText={basicInfoErrors.firstName?.message}
                  />
                  <TextField
                    label="Last Name"
                    fullWidth
                    {...registerBasicInfo("lastName", { required: "Last name is required" })}
                    error={!!basicInfoErrors.lastName}
                    helperText={basicInfoErrors.lastName?.message}
                  />
                </Stack>
                <TextField
                  multiline
                  rows={4}
                  label="Bio"
                  fullWidth
                  {...registerBasicInfo("bio")}
                />
              </Stack>

              {/* Address Information */}
              <Typography variant="h5" pt={2} color="primary">Address Information</Typography>
              <TextField
                label="Address"
                fullWidth
                {...registerBasicInfo("address", { required: "Address is required" })}
                error={!!basicInfoErrors.address}
                helperText={basicInfoErrors.address?.message}
              />
              <Autocomplete
                options={locations}
                defaultValue={locations?.find((loc) => loc.location_id === instructorInfo.location_id)}
                onChange={(event, value) => setValue("location_id", value.location_id)}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="City" />}
              />
              <Typography variant="h5" pt={2} color="primary">Contact Information</Typography>
              <TextField
                label="Phone Number"
                disabled
                {...registerBasicInfo("phone")}
              />
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <CustomButton type="submit" variant="contained" sx={{ bgcolor: "blue.main" }}>
                  {loading.basicInfo ? "SAVING..." : "SAVE CHANGES"}
                </CustomButton>
                <CustomButton
                  variant="outlined"
                  sx={{ color: "blue.main", borderColor: "blue.main" }}
                  onClick={() => resetBasicInfo()}
                >
                  CANCEL
                </CustomButton>
              </Box>
            </Stack>
          </form>

          <Divider />

          {/* Security Form */}
          <form onSubmit={handleSecuritySubmit(handlePasswordSubmit)}>
            <Stack spacing={2}>
              <Typography variant="h5" color="primary">Account Security</Typography>
              <TextField label="Email" disabled {...registerSecurity("email")} />
              <FormInput
                label="Current Password"
                type="password"
                handleClickShowPassword={() => setIsPasswordVisible((prev) => ({ ...prev, current: !prev.current }))}
                {...registerSecurity("currentPassword", { required: "Current password is required" })}
                error={!!securityErrors.currentPassword}
                helperText={securityErrors.currentPassword?.message}
                showPassword={isPasswordVisible.current}
              />
              <FormInput
                label="New Password"
                type="password"
                handleClickShowPassword={() => setIsPasswordVisible((prev) => ({ ...prev, new: !prev.new }))}
                {...registerSecurity("newPassword", {
                  required: "New password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                })}
                error={!!securityErrors.newPassword}
                helperText={securityErrors.newPassword?.message}
                showPassword={isPasswordVisible.new}
              />
              <FormInput
                label="Confirm New Password"
                type="password"
                handleClickShowPassword={() => setIsPasswordVisible((prev) => ({ ...prev, new: !prev.new }))}
                {...registerSecurity("confirmNewPassword", {
                  required: "Please confirm the new password",
                  validate: (value) => value === watch("newPassword") || "Passwords do not match",
                })}
                error={!!securityErrors.confirmNewPassword}
                helperText={securityErrors.confirmNewPassword?.message}
                showPassword={isPasswordVisible.new}
              />
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <CustomButton type="submit" variant="contained" sx={{ bgcolor: "blue.main" }}>
                  {isUpdatingPassword ? "SAVING..." : "SAVE CHANGES"}
                </CustomButton>
                <CustomButton
                  variant="outlined"
                  sx={{ color: "blue.main", borderColor: "blue.main" }}
                  onClick={() => resetSecurity()}
                >
                  CANCEL
                </CustomButton>
              </Box>
            </Stack>
          </form>
        </Grid>
      )}

      {/* Snackbar Alert */}
      {snackbar.open && (
        <CustomAlert
          label={snackbar.message}
          severity={snackbar.severity}
          open={snackbar.open}
          onClose={() => setSnackbar({ open: false, message: "", severity: "success" })}
        />
      )}
    </Box>
  );
}

export default SettingPage;
