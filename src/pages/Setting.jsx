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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPasswords, setShowNewPasswords] = useState(false);

  const [open, setOpen] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [profileImg, setProfileImg] = useState("");

  const [isProfileImgLoading, setIsProfileImgLoading] = useState(false);
  const [isBasicInfoLoading, setIsBasicInfoLoading] = useState(false);

  const { data: locationData } = useGetLocationsQuery();
  const {
    data: instructorData,
    refetch,
    isLoading,
  } = useGetInstructorInfoQuery();
  const [updateInfo] = useUpdateInstructorInfoMutation();
  const [updatePassword, { isLoading: updatePasswordLoading }] =
    useUpdateInstructorPasswordMutation();

  const {
    register: basicInfoRegister,
    handleSubmit: handleBasicInfoSubmit,
    setValue,
    reset: resetBasicInfo,
    formState: { errors: basicInfoErrors },
  } = useForm();
  const {
    register: securityRegister,
    handleSubmit: handleSecuritySubmit,
    reset: resetSecurity,
    formState: { errors: securityErrors },
    watch,
  } = useForm();

  const locations = locationData?.data;
  const instructorInfo = instructorData?.data?.instructor;

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
      setProfileImg(
        setTimeout(() => {
          setProfileImg(`${instructorInfo.imageUrl}?${new Date().getTime()}`);
        }),
        100
      );
    }
  }, [instructorInfo, resetBasicInfo, resetSecurity, setValue]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileSelected(true);
      setProfileImg(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("photo", file);

      try {
        setIsProfileImgLoading(true);
        await updateInfo(formData).unwrap();
        refetch();
        setProfileImg(`${instructorInfo.imageUrl}?${new Date().getTime()}`);
        setSnackbarSeverity("success");
        setSnackbarMessage("Profile image updated successfully");
      } catch (error) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Error uploading image");
      } finally {
        setSnackbarOpen(true);
        setIsProfileImgLoading(false);
        setOpen(false);
        setFileSelected(false);
      }
    }
  };

  // Handle Basic Info Submission
  const onSubmitBasicInfo = async (data) => {
    console.log("data", data);
    try {
      setIsBasicInfoLoading(true);
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
      setIsBasicInfoLoading(false);
    }
  };

  // Handle Password Submission
  const onSubmitPassword = async (data) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;
    console.log('data', data)
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
          <Stack spacing={2} width={"140px"}>
            <Typography variant="h5" color="primary">
              Profile
            </Typography>
            <Avatar
              src={profileImg}
              variant="square"
              sx={{ width: 140, height: 140 }}
            />
            <CustomButton
              variant="outlined"
              sx={{ color: "blue.main", borderColor: "blue.main" }}
              onClick={() => setOpen(true)}
            >
              {isProfileImgLoading && fileSelected ? "CHANGING..." : "CHANGE"}
            </CustomButton>
            {open && !fileSelected && (
              <CustomFileUpload
                open={open}
                handleClose={() => setOpen(false)}
                onChange={handleImageUpload}
              />
            )}
          </Stack>

          <form onSubmit={handleBasicInfoSubmit(onSubmitBasicInfo)}>
            {/* Personal Information */}
            <Stack spacing={2}>
              <Typography variant="h5" color="primary">
                Personal Information
              </Typography>
              <Stack direction="row" gap={2}>
                <Stack gap={2} width={"50%"}>
                  <TextField
                    label="First Name"
                    fullWidth
                    {...basicInfoRegister("firstName", {
                      required: "Firstname is required",
                    })}
                    error={!!basicInfoErrors.firstName}
                    helperText={basicInfoErrors.firstName?.message}
                  />
                  <TextField
                    label="Last Name"
                    fullWidth
                    {...basicInfoRegister("lastName", {
                      required: "Lastname is required",
                    })}
                    error={!!basicInfoErrors.lastName}
                    helperText={basicInfoErrors.lastName?.message}
                  />
                </Stack>
                <TextField
                  multiline
                  rows={4}
                  label="Bio"
                  fullWidth
                  {...basicInfoRegister("bio")}
                />
              </Stack>
              <Typography variant="h5" pt={2} color="primary">
                Address Information
              </Typography>
              <TextField
                label="Address"
                fullWidth
                {...basicInfoRegister("address", {
                  required: "Address is required",
                })}
                error={!!basicInfoErrors.address}
                helperText={basicInfoErrors.address?.message}
              />
              <Autocomplete
                options={locations}
                defaultValue={locations?.find(
                  (loc) => loc.location_id === instructorInfo.location_id
                )}
                onChange={(event, value) =>
                  setValue("location_id", value.location_id)
                }
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="City" />}
              />
              <Typography variant="h5" pt={2} color="primary">
                Contact Information
              </Typography>
              <TextField
                label="Phone Number"
                disabled
                {...basicInfoRegister("phone")}
              />
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <CustomButton
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: "blue.main" }}
                >
                  {isBasicInfoLoading ? "SAVING..." : "SAVE CHANGES"}
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

          {/* Security Section */}
          <form onSubmit={handleSecuritySubmit(onSubmitPassword)}>
            <Stack spacing={2}>
              <Typography variant="h5" color="primary">
                Account Security
              </Typography>
              <TextField
                label="Email"
                disabled
                {...securityRegister("email")}
              />
              <FormInput
                label="Current Password"
                type="password"
                handleClickShowPassword={() =>
                  setShowCurrentPassword((prev) => !prev)
                }
                {...securityRegister("currentPassword", {
                  required: "Current password is required",
                })}
                error={!!securityErrors.currentPassword}
                helperText={securityErrors.currentPassword?.message}
                showPassword={showCurrentPassword}
              />
              <FormInput
                label="New Password"
                type="password"
                handleClickShowPassword={() =>
                  setShowNewPasswords((prev) => !prev)
                }
                {...securityRegister("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                error={!!securityErrors.newPassword}
                helperText={securityErrors.newPassword?.message}
                showPassword={showNewPasswords}
              />
              <FormInput
                label="Confirm New Password"
                type="password"
                handleClickShowPassword={() =>
                  setShowNewPasswords((prev) => !prev)
                }
                {...securityRegister("confirmNewPassword", {
                  required: "Please confirm the new password",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords don't match",
                })}
                error={!!securityErrors.confirmNewPassword}
                helperText={securityErrors.confirmNewPassword?.message}
                showPassword={showNewPasswords}
              />
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <CustomButton
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: "blue.main" }}
                >
                  {updatePasswordLoading ? "SAVING..." : "SAVE CHANGES"}
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

          <CustomAlert
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            label={snackbarMessage}
          />
        </Grid>
      )}
    </Box>
  );
}

export default SettingPage;
