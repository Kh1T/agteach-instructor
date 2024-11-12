import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  useGetInstructorInfoQuery,
  useGetLocationsQuery,
  useUpdateInstructorInfoMutation,
  useUpdateInstructorPasswordMutation,
} from "../services/api/authApi";

import {
  Avatar,
  Grid,
  Typography,
  Stack,
  TextField,
  Box,
  Divider,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
} from "@mui/material";

import { CustomAlert } from "../components/CustomAlert";
import CustomButton from "../components/CustomButton";
import CustomFileUpload from "../components/CustomFileUpload";
import FormInput from "../components/login-signup/FormInput";
import { validate } from "uuid";
import TextInput from "../components/login-signup/TextInputComponent";

function SettingPage() {
  // BasicInfo From Control
  //******************************************************** */
  const {
    control,
    register: registerBasicInfo,
    handleSubmit: handleBasicInfoSubmit,
    reset: resetBasicInfo,
    formState: { errors: basicInfoErrors },
  } = useForm();

  //******************************************************** */
  // Password From Control
  const {
    register: registerSecurity,
    handleSubmit: handleSecuritySubmit,
    reset: resetSecurity,
    formState: { errors: securityErrors },
    watch,
  } = useForm();

  //******************************************************** */
  // API Instructor Update
  const {
    data: instructorData,
    refetch,
    isLoading,
  } = useGetInstructorInfoQuery();
  const [updateInfo] = useUpdateInstructorInfoMutation();

  //******************************************************** */
  //API Password Update
  const [updatePassword, { isLoading: isUpdatingPassword }] =
    useUpdateInstructorPasswordMutation();
  //******************************************************** */

  const { data: locationData } = useGetLocationsQuery();

  //******************************************************** */

  // State Management
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    current: false,
    new: false,
  });
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState({
    profileImg: false,
    basicInfo: false,
  });

  //*********************************************************/

  // MUI Component State Management
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  //*********************************************************/
  //Data Destructuring

  const locations = locationData?.data || [];
  const instructorInfo = instructorData?.data?.instructor;

  //*********************************************************/

  // Populate form on mount with instructor's info
  useEffect(() => {
    if (!isLoading) {
      try {
        resetBasicInfo({
          firstName: instructorInfo?.firstName,
          lastName: instructorInfo?.lastName,
          bio: instructorInfo?.bio || "",
          phone: instructorInfo?.phone || "",
          address: instructorInfo?.address || "",
          locationId: instructorInfo?.location?.locationId,
        });
        resetSecurity({
          email: instructorInfo.email,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } catch (error) {
        console.log("An error occured", error);
      }
      setProfileImage(`${instructorInfo.imageUrl}?${new Date().getTime()}`);
    }
  }, [instructorInfo, isLoading, resetBasicInfo, resetSecurity]);

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
      setSnackbar({
        open: true,
        message: "Profile image updated successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error uploading image",
        severity: "error",
      });
    } finally {
      setLoading((prev) => ({ ...prev, profileImg: false }));
      setDialogOpen(false);
      setIsImageSelected(false);
    }
  };

  //*********************************************************/
  // Handle Basic Info Submission
  const handleBasicInfoSubmission = async (data) => {
    try {
      setLoading((prev) => ({ ...prev, basicInfo: true }));
      await updateInfo(data).unwrap();
      refetch();
      setSnackbar({
        open: true,
        message: "Information updated successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error updating information",
        severity: "error",
      });
    } finally {
      setLoading((prev) => ({ ...prev, basicInfo: false }));
    }
  };

  //*********************************************************/
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
        setSnackbar({
          open: true,
          message: "Password updated successfully",
          severity: "success",
        });
        resetSecurity();
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error updating password",
        severity: "error",
      });
    }
  };

  const validatePhone = (value) => {
    const phonePattern = /^[0-9]+$/; // Only digits
    if (!value.startsWith("0")) return "Phone number must start with 0";
    if (!phonePattern.test(value)) return "Please enter a valid phone number";
    if (value.length > 15) return "Phone number cannot exceed 15 digits";
    if  (value?.length < 8) return "A valid phone number should contains atleast 8 digits";
  };

  const validatePassword = (value) => {
    if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter.";
    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter.";
    if (!/\d/.test(value)) return "Password must contain at least one number.";
    if (!/[@$!%*?&]/.test(value)) return "Password must contain at least one special character.";
    return true; 
  };

  //*********************************************************/
  if (isLoading) return <Typography>Loading...</Typography>;
  return (
    <Box mb={15}>
      <Grid container direction="column" gap={5}>
        {/* Profile Section */}
        <Stack spacing={2} width="140px">
          <Typography variant="h5" color="primary">
            Profile
          </Typography>
          <Avatar
            src={profileImage}
            variant="square"
            sx={{ width: 140, height: 140 }}
          />
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
            <Typography variant="h5" color="primary">
              Personal Information
            </Typography>
            <Stack direction="row" gap={2}>
              <Stack gap={2} width="50%">
                <TextField
                  label="First Name"
                  fullWidth
                  {...registerBasicInfo("firstName", {
                    required: "First name is required",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "First name can only contain letters",
                    },
                    validate: (value) => {
                      if (value.length < 2) return "First name must be at least 2 characters";
                      if (value.length > 25) return "First name must be at most 25 characters";
                      return true;
                    }
                  })}
                  error={!!basicInfoErrors.firstName}
                  helperText={basicInfoErrors.firstName?.message}
                />
                <TextField
                  label="Last Name"
                  fullWidth
                  {...registerBasicInfo("lastName", {
                    required: "Last name is required",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "First name can only contain letters",
                    },
                    validate: (value) => {
                      if (value.length < 2) return "Last name must be at least 2 characters";
                      if (value.length > 25) return "Last name must be at most 25 characters";
                      return true;
                    }
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
                {...registerBasicInfo("bio", {
                  validate: (value) => {
                    if (value.length > 1000) return "Bio must be at most 1000 characters";
                  }
                })}
              />
            </Stack>

            {/* Address Information */}
            <Typography variant="h5" pt={2} color="primary">
              Address Information
            </Typography>
            <TextField
              label="Address"
              fullWidth
              {...registerBasicInfo("address", {
                required: "Address is required",
                validate: (value) => {
                  if (value.length < 2) return "Address must be at least 2 characters";
                  if (value.length > 100) return "Address must be at most 100 characters";
                  return true;
                }
              })}
              error={!!basicInfoErrors.address}
              helperText={basicInfoErrors.address?.message}
            />
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Controller
                name="locationId"
                control={control}
                defaultValue=""
                rules={{
                  validate: (value) =>
                    value
                      ? locations.some((city) => city.locationId === value) ||
                        "Please provide a valid city"
                      : "Please select a city",
                }}
                render={({ field }) => (
                  <Select {...field} label="City">
                    {locations.map((city) => (
                      <MenuItem key={city.locationId} value={city.locationId}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />

              <FormHelperText>{basicInfoErrors?.city?.message}</FormHelperText>
            </FormControl>

            <Typography variant="h5" pt={2} color="primary">
              Contact Information
            </Typography>
            <FormControl variant="outlined" error={!!basicInfoErrors?.phone}>
              <TextInput
                id="phone-number"
                label="Phone Number"
                placeholder="e.g. 1234567890"
                {...registerBasicInfo("phone", {
                  required: "Phone number is required",
                  validate: validatePhone,
                })}
              />
              {basicInfoErrors.phone && (
                <FormHelperText>
                  {basicInfoErrors?.phone?.message}
                </FormHelperText>
              )}
            </FormControl>
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <CustomButton
                type="submit"
                variant="contained"
                sx={{ bgcolor: "blue.main" }}
              >
                {loading.basicInfo ? "SAVING..." : "SAVE CHANGES"}
              </CustomButton>
              <CustomButton
                variant="outlined"
                type="button"
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
            <Typography variant="h5" color="primary">
              Account Security
            </Typography>
            <TextField label="Email" disabled {...registerSecurity("email")} />
            <FormInput
              label="Current Password"
              type="password"
              handleClickShowPassword={() =>
                setIsPasswordVisible((prev) => ({
                  ...prev,
                  current: !prev.current,
                }))
              }
              {...registerSecurity("currentPassword", {
                required: "Current password is required",
              })}
              error={!!securityErrors.currentPassword}
              helperText={securityErrors.currentPassword?.message}
              showPassword={isPasswordVisible.current}
            />
            <FormInput
              label="New Password"
              type="password"
              handleClickShowPassword={() =>
                setIsPasswordVisible((prev) => ({ ...prev, new: !prev.new }))
              }
              {...registerSecurity("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: validatePassword,
              })}
              error={!!securityErrors.newPassword}
              helperText={securityErrors.newPassword?.message}
              showPassword={isPasswordVisible.new}
            />
            <FormInput
              label="Confirm New Password"
              type="password"
              handleClickShowPassword={() =>
                setIsPasswordVisible((prev) => ({ ...prev, new: !prev.new }))
              }
              {...registerSecurity("confirmNewPassword", {
                required: "Please confirm the new password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              error={!!securityErrors.confirmNewPassword}
              helperText={securityErrors.confirmNewPassword?.message}
              showPassword={isPasswordVisible.new}
            />
            <Typography color="dark.300" fontSize="12px" marginTop={"10px"}>
              Password must contains at least one lowercase letter, one uppercase letter, one number, and one special character.
            </Typography>
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <CustomButton
                type="submit"
                variant="contained"
                sx={{ bgcolor: "blue.main" }}
              >
                {isUpdatingPassword ? "SAVING..." : "SAVE CHANGES"}
              </CustomButton>
              <CustomButton
                variant="outlined"
                type="button"
                sx={{ color: "blue.main", borderColor: "blue.main" }}
                onClick={() => resetSecurity()}
              >
                CANCEL
              </CustomButton>
            </Box>
          </Stack>
        </form>
      </Grid>

      {/* Snackbar Alert */}
      {snackbar.open && (
        <CustomAlert
          label={snackbar.message}
          severity={snackbar.severity}
          open={snackbar.open}
          onClose={() =>
            setSnackbar({ open: false, message: "", severity: "success" })
          }
        />
      )}
    </Box>
  );
}

export default SettingPage;
